using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PortfolioReviewsApi.Data;
using PortfolioReviewsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioReviewsApi.Pages.Admin
{
    [Authorize]
    public class ReviewsModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        public ReviewsModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Review> PendingReviews { get; set; } = new();

        public async Task OnGetAsync()
        {
            PendingReviews = await _context.Reviews.Where(r => !r.Approved).ToListAsync();
        }

        public async Task<IActionResult> OnPostApproveAsync(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review != null)
            {
                review.Approved = true;
                await _context.SaveChangesAsync();
            }
            return RedirectToPage();
        }

        public async Task<IActionResult> OnPostDeleteAsync(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review != null)
            {
                _context.Reviews.Remove(review);
                await _context.SaveChangesAsync();
            }
            return RedirectToPage();
        }
    }
} 