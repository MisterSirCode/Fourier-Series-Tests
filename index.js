const canvas = document.querySelector(".fourierCanvas");
const cve = new CanvasEngine(canvas);

let t = 0;

function init() {
    cve.width = 512;
    cve.height = 512;
    cve.fullScreen();
    update();
}

function update() {
    t += 0.1;
    cve.clear();
    cve.fillStyle = "black";
    cve.fillCanvas();
    cve.origin(cve.center, cve.middle);
    cve.fillStyle = "white";
    cve.fillCirc(0, 0, 10);
    cve.rotate(t * 100, true);
    cve.EnterPath();
    cve.strokeStyle = "white";
    cve.stroke
    let r1 = 200,
    r2 = 100;
    let xo = 0;
    let yo = 0;
    for (var i = 0; i < 5000; ++i) {
        let tau = i / (Math.PI * 1 + (Math.random()));
        let tau2 = i / Math.PI;
        let x1 = Math.sin(tau) * r1;
        let y1 = Math.cos(tau) * r1;
        let x2 = x1 + Math.sin(tau2) * r2;
        let y2 = y1 + Math.cos(tau2) * r2;
        if (i == 0)
            cve.MoveTo(x2, y2);
        else
            cve.MoveTo(xo, yo);
        cve.LineTo(x2, y2);
        xo = x2;
        yo = y2;
    }
    cve.Stroke();
    cve.ExitPath();
    cve.resetOrigin();
    cve.resetTransform();
    window.requestAnimationFrame(update);
}

init();