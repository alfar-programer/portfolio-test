import { useEffect } from 'react';

const AnimatedCanvas = () => {
  useEffect(() => {
    let ctx, f;
    let e = 0;
    const pos = {};
    let lines = [];

    const E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

    function Node() {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }

    function n(e = {}) {
      this.init(e);
    }

    n.prototype = {
      init(e) {
        this.phase = e.phase || 0;
        this.offset = e.offset || 0;
        this.frequency = e.frequency || 0.001;
        this.amplitude = e.amplitude || 1;
      },
      update() {
        this.phase += this.frequency;
        e = this.offset + Math.sin(this.phase) * this.amplitude;
        return e;
      },
      value() {
        return e;
      },
    };

    function Line(e = {}) {
      this.init(e);
    }

    Line.prototype = {
      init(e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let i = 0; i < E.size; i++) {
          const t = new Node();
          t.x = pos.x;
          t.y = pos.y;
          this.nodes.push(t);
        }
      },
      update() {
        let e = this.spring;
        let t = this.nodes[0];
        t.vx += (pos.x - t.x) * e;
        t.vy += (pos.y - t.y) * e;

        for (let i = 0, n, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i];
          if (i > 0) {
            n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e;
            t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.dampening;
            t.vy += n.vy * E.dampening;
          }

          t.vx *= this.friction;
          t.vy *= this.friction;
          t.x += t.vx;
          t.y += t.vy;

          e *= E.tension;
        }
      },
      draw() {
        let e, t;
        let n = this.nodes[0].x;
        let i = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(n, i);

        for (let a = 1; a < this.nodes.length - 2; a++) {
          e = this.nodes[a];
          t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
        }

        e = this.nodes[this.nodes.length - 2];
        t = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
        ctx.stroke();
        ctx.closePath();
      },
    };

    function onMousemove(e) {
      function initLines() {
        lines = [];
        for (let i = 0; i < E.trails; i++) {
          lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
        }
      }

      function handle(e) {
        let x = e.touches ? e.touches[0].pageX : e.clientX;
        let y = e.touches ? e.touches[0].pageY : e.clientY;

        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
          cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;

          const rect = cursor.getBoundingClientRect();
          pos.x = rect.left + 10;
          pos.y = rect.top + 10;
        }

        e.preventDefault();
      }

      function touchStart(e) {
        if (e.touches.length === 1) {
          pos.x = e.touches[0].pageX;
          pos.y = e.touches[0].pageY;
        }
      }

      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.addEventListener('mousemove', handle);
      document.addEventListener('touchmove', handle);
      document.addEventListener('touchstart', touchStart);
      handle(e);
      initLines();
      render();
    }

    function render() {
      if (ctx.running) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = `hsla(${Math.round(f.update())}, 50%, 20%, 0.8)`;
        ctx.lineWidth = 3;

        for (let i = 0; i < E.trails; i++) {
          lines[i].update();
          lines[i].draw();
        }

        ctx.frame++;
        requestAnimationFrame(render);
      }
    }

    function resizeCanvas() {
      const canvas = document.getElementById('canvas');
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }

    function renderCanvas() {
      const canvas = document.getElementById('canvas');
      if (!canvas) return;
      ctx = canvas.getContext('2d');
      ctx.running = true;
      ctx.frame = 1;
      f = new n({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      });

      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('touchstart', onMousemove);
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
    }

    renderCanvas();

    return () => {
      ctx.running = false;
    };
  }, []);

  return (
    <>
      {/* Canvas for trail animation */}
      <canvas
        id="canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Custom cursor */}
      <div
        id="custom-cursor"
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#00FFF0',
          pointerEvents: 'none',
          zIndex: 1000,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.05s ease-out',
        }}
      />
    </>
  );
};

export default AnimatedCanvas;
