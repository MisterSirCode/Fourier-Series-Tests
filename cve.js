const Mathf = {
	Clamp: function(n, a, b) { // Value, Mininum, Maximum
		return Math.min(Math.max(n, a), b);
	},
	Deg2Rad: Math.PI * 2 / 360,
	Rad2Deg: 1 / this.Deg2Rad,
	Repeat: function(t, l) {
		return ((t % l) + l) % l;
	},
	Lerp: function(a, b, t) { // Value One, Value Two, Time
		return a + (b - a) * this.Clamp(t, 0, 1);
	},
	LerpAng: function(a, b, t) { // Angle One, Angle Two, Time
		const d = this.Repeat((b - a), 360);
		return a + d * this.Clamp(t, 0, 1);
	},
	LerpColor: function(r, g, b, r2, g2, b2, t) {
		return [this.Lerp(r, r2, t), this.Lerp(g, g2, t), this.Lerp(b, b2, t)];
	},
	Approx: function(a, b) {
		return Math.Abs(b - a) < Math.Max(Number.EPSILON * Math.Max(Math.Abs(a), Math.Abs(b)), Number.EPSILON * 8);
	},
	SubXY: function(c1, c2) {
		return c1 > c2 ? c1 - c2 : c2 - c1;
	},
	SubDiv: function(c1, c2) {
		return c1 > c2 ? c1 / c2 : c2 / c1;
	}
};
Object.freeze(Mathf);
Object.preventExtensions(Mathf);
Object.seal(Mathf);
class CanvasEngine {
	#cvs;
	#ctx;
	#font;
	#fontSize = "16px";
	#curLogs = 0;
    #origin = [0, 0];
	constructor(cvs) {
		if (typeof cvs == "object" && cvs.nodeType != undefined)
			if (cvs.getContext) this.#ctx = (this.#cvs = cvs).getContext("2d");
			else throw new TypeError("Type is not instance of HTMLCanvasElement");
		else throw new TypeError("Type is not instance of HTMLElement");
		return this;
	}
	get width() {
		return this.#cvs.width;
	}
	get height() {
		return this.#cvs.height;
	}
	set width(n) {
		this.#cvs.width = n;
	}
	set height(n) {
		this.#cvs.height = n;
	}
    get right() {
        return this.#cvs.width;
    }
    get top() {
        return this.#cvs.height;
    }
    get center() {
        return this.#cvs.width / 2;
    }
    get middle() {
        return this.#cvs.height / 2;
    }
	set filter(str) {
		this.#ctx.filter = str;
	}
	set font(str) {
		this.#font = str;
		this.#ctx.font = this.#fontSize + this.#font;
	}
	get font() {
		return this.#ctx.font;
	}
	set fontSize(str) {
		this.#fontSize = str;
		this.#ctx.font = this.#fontSize + this.#font;
	}
	set textArea(str) {
		str = str.split(/\s/);
		this.#ctx.textAlign = str[0];
		this.#ctx.textBaseline = str[1];
	}
	set fillStyle(str) {
		this.#ctx.fillStyle = str;
	}
	set strokeStyle(str) {
		this.#ctx.strokeStyle = str;
	}
	get canvas() {
		return this.#cvs;
	}
	get context() {
		return this.#ctx;
	}
	fullScreen() {
		this.#cvs.width = window.innerWidth;
		this.#cvs.height = window.innerHeight;
	}
	drawLog(text) {
		this.Push();
		this.#ctx.fillStyle = "white";
		this.#ctx.strokeStyle = "black";
		this.textArea = "right top";
		this.#ctx.strokeText(text, this.w - 10, 10 + (this.#curLogs * 16), this.w / 2);
		this.#ctx.fillText(text, this.w - 10, 10 + (this.#curLogs * 16), this.w / 2);
		this.Pull();
		this.#curLogs++;
	}
	clear() {
		this.#ctx.clearRect(0, 0, this.#cvs.width, this.#cvs.height);
		this.#curLogs = 0;
	}
    fillCanvas() {
        this.fillRect(0, 0, this.#cvs.width, this.#cvs.height);
    }
	rect(x, y, w, h) {
		this.#ctx.rect(x, y, w, h);
	}
	rectMid(x, y, w, h) {
		this.rect(Mathf.SubXY((w / 2), x), Mathf.SubXY((h / 2), y), w, h);
	}
	rectXY(x, y, x1, y1) {
		this.#ctx.rect(x, y, Mathf.SubXY(x1, x), Mathf.SubXY(y1, y));
	}
	fillRect(x, y, w, h) {
		this.#ctx.beginPath();
		this.rect(x, y, w, h);
		this.#ctx.fill();
	}
	strokeRect(x, y, w, h) {
		this.#ctx.beginPath();
		this.rect(x, y, w, h);
		this.#ctx.stroke();
	}
	fillRectMid(x, y, w, h) {
		this.#ctx.beginPath();
		this.rectMid(x, y, w, h);
		this.#ctx.fill();
	}
	strokeRectMid(x, y, w, h) {
		this.#ctx.beginPath();
		this.rectMid(x, y, w, h);
		this.#ctx.stroke();
	}
	fillRectXY(x, y, x1, y1) {
		this.#ctx.beginPath();
		this.rectXY(x, y, x1, y1);
		this.#ctx.fill();
	}
	strokeRectXY(x, y, x1, y1) {
		this.#ctx.beginPath();
		this.rectXY(x, y, x1, y1);
		this.#ctx.stroke();
	}
	circ(x, y, r) {
		this.#ctx.arc(x, y, r, Math.PI * 2, 0, false);
	}
	oval(x, y, w, h, r) {
		this.#ctx.ellipse(x, y, w, h, r, Math.PI * 2, 0, false);
	}
	fillCirc(x, y, r) {
		this.#ctx.beginPath();
		this.circ(x, y, r);
		this.#ctx.fill();
	}
	strokeCirc(x, y, r) {
		this.#ctx.beginPath();
		this.circ(x, y, r);
		this.#ctx.stroke();
	}
	fillOval(x, y, w, h, r) {
		this.#ctx.beginPath();
		this.oval(x, y, w, h, r);
		this.#ctx.fill();
	}
	strokeOval(x, y, w, h, r) {
		this.#ctx.beginPath();
		this.oval(x, y, w, h, r);
		this.#ctx.stroke();
	}
	ovalXY(x, y, x1, y1, r) {
		this.oval(x + (Mathf.SubXY(x1, x) / 2), y + (Mathf.SubXY(y1, y) / 2), Mathf.SubXY(x1, x) / 2, Mathf.SubXY(y1, y) / 2, r);
	}
	fillOvalXY(x, y, x1, y1, r) {
		this.#ctx.beginPath();
		this.ovalXY(x, y, x1, y1, r);
		this.#ctx.fill();
	}
	strokeOvalXY(x, y, x1, y1, r) {
		this.#ctx.beginPath();
		this.ovalXY(x, y, x1, y1, r);
		this.#ctx.stroke();
	}
	fillText(str, x, y, mw) {
		this.#ctx.fillText(str, x, y, mw);
	}
	strokeText(str, x, y, mw) {
		this.#ctx.strokeText(str, x, y, mw);
	}
	Push() {
		this.#ctx.save();
	}
	Pull() {
		this.#ctx.restore();
	}
	EnterPath() {
		this.#ctx.beginPath();
	}
	ExitPath() {
		this.#ctx.closePath();
	}
	Fill() {
		this.#ctx.fill();
	}
	Stroke() {
		this.#ctx.stroke();
	}
	MoveTo(x, y) {
		this.#ctx.moveTo(x, y);
	}
	LineTo(x, y) {
		this.#ctx.lineTo(x, y);
	}
    rotate(n, degrees) {
        if (degrees)
            this.#ctx.rotate(n * Math.PI / 180);
        else
            this.#ctx.rotate(n);
    }
    origin(x, y) {
        this.#ctx.translate(x, y);
        this.#origin[0] = x;
        this.#origin[1] = y;
    }
    resetOrigin() {
        this.#ctx.translate(-this.#origin[0], -this.#origin[1]);
        this.#origin = [0, 0];
    }
    resetTransform() {
        this.#ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
	scale(x, y) {
		this.#ctx.scale(x, y);
	}
	drawImage(...args) {
		this.#ctx.drawImage(...args);
	}
	get engineInfoAndSource() {
		return {
			developer: "Mister SirCode",
			repository: "https://github.com/scextensions/CGame-Engine/",
			version: "1.0"
		}
	}
}