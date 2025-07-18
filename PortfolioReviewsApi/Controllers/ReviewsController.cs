using Microsoft.AspNetCore.Mvc;
using PortfolioReviewsApi.Data;
using PortfolioReviewsApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace PortfolioReviewsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/reviews
        [HttpGet]
        public async Task<IActionResult> GetApprovedReviews()
        {
            var reviews = await _context.Reviews
                .Where(r => r.Approved)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
            return Ok(reviews);
        }

        // POST: api/reviews
        [HttpPost]
        public async Task<IActionResult> PostReview([FromBody] Review review)
        {
            if (string.IsNullOrWhiteSpace(review.Name) ||
                string.IsNullOrWhiteSpace(review.Email) ||
                string.IsNullOrWhiteSpace(review.Comment))
            {
                return BadRequest(new { message = "All fields are required." });
            }
            review.Approved = false;
            review.CreatedAt = DateTime.UtcNow;
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return StatusCode(201, new { message = "Review submitted, pending approval." });
        }

        // GET: api/reviews/pending (admin only)
        [Authorize]
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingReviews()
        {
            var reviews = await _context.Reviews
                .Where(r => !r.Approved)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
            return Ok(reviews);
        }

        // PUT: api/reviews/{id}/approve (admin only)
        [Authorize]
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound();
            review.Approved = true;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Review approved." });
        }

        // DELETE: api/reviews/{id} (admin only)
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null) return NotFound();
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Review deleted." });
        }
    }
} 