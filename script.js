let start = null;
let end = null;
let parent = document.querySelector(".bounds");
let parentBounds = parent.getBoundingClientRect();
parent.oncontextmenu = function () {
	return false;
};
let arrows = document.querySelector(".arrows");

function clamp(number, min, max) {
	return Math.max(min, Math.min(number, max));
}

function getRowCol(mouseX, mouseY) {
	return [
		clamp(
			Math.floor((mouseY - parentBounds.top) / (parentBounds.height / 8)),
			0,
			7
		),
		clamp(
			Math.floor((mouseX - parentBounds.left) / (parentBounds.width / 8)),
			0,
			7
		),
	];
}

function drawHorseArrow(polygon, start, transform) {
	let horseMovePoints = [
		[4.875 + 12.5 * start[1], 10.75 + 12.5 * start[0]],
		[4.875 + 12.5 * start[1], 32.625 + 12.5 * start[0]],
		[14.25 + 12.5 * start[1], 32.625 + 12.5 * start[0]],
		[14.25 + 12.5 * start[1], 34.5 + 12.5 * start[0]],
		[18.75 + 12.5 * start[1], 31.25 + 12.5 * start[0]],
		[14.25 + 12.5 * start[1], 28 + 12.5 * start[0]],
		[14.25 + 12.5 * start[1], 29.875 + 12.5 * start[0]],
		[7.625 + 12.5 * start[1], 29.875 + 12.5 * start[0]],
		[7.625 + 12.5 * start[1], 10.75 + 12.5 * start[0]],
	];
	for (let val of horseMovePoints) {
		let point = arrows.createSVGPoint();
		point.x = val[0];
		point.y = val[1];
		polygon.points.appendItem(point);
	}
	polygon.classList.add("arrow");
	polygon.style.fill = "rgba(255, 170, 0, 0.8)";
	polygon.style.opacity = "0.8";
	polygon.setAttribute("transform", transform);
}

function createArrow(start, end) {
	let transform = "";
	let rowDiff = end[0] - start[0];
	let colDiff = end[1] - start[1];
	let polygon = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"polygon"
	);
	arrows.appendChild(polygon);
	if (rowDiff == 2 && colDiff == -1) {
		transform = `rotate(0, ${18.75 + 12.5 * end[1]} ${
			18.75 + 12.5 * end[1]
		}) scale(-1, 1) translate(${-37.5 - 25 * end[1]})`;
		drawHorseArrow(polygon, start, transform);
	} else if (rowDiff == 2 && colDiff == 1) {
		drawHorseArrow(polygon, start, transform);
	} else if (rowDiff == 1 && colDiff == 2) {
		transform = `rotate(270, ${6.25 + 12.5 * start[1]} ${
			6.25 + 12.5 * start[0]
		}) scale(-1, 1) translate(${-12.5 - 25 * start[1]})`;
		drawHorseArrow(polygon, start, transform);
	} else if (rowDiff == -1 && colDiff == 2) {
		transform = `rotate(270, ${6.25 + 12.5 * start[1]} ${
			18.75 + 12.5 * end[0]
		})`;
		drawHorseArrow(polygon, start, transform);
	} else if (rowDiff == -2 && colDiff == -1) {
		transform = `rotate(180, ${18.75 + 12.5 * end[1]} ${
			31.25 + 12.5 * end[0]
		})`;
		drawHorseArrow(polygon, start, transform);
	} else if (rowDiff == -2 && colDiff == 1) {
		transform = `rotate(180, ${6.5 + 12.5 * start[1]} ${
			31.25 + 12.5 * end[0]
		}) scale(-1, 1), translate(${-12.5 - 25 * start[1]})`;
		drawHorseArrow(polygon, start, transform);
	} else if (rowDiff == 1 && colDiff == -2) {
		transform = `rotate(90, ${31.25 + 12.5 * end[1]} ${
			6.25 + 12.5 * start[0]
		})`;
		drawHorseArrow(polygon, start, transform);
	} else if (rowDiff == -1 && colDiff == -2) {
		transform = `rotate(90, ${31.25 + 12.5 * end[1]} ${
			18.75 + 12.5 * end[0]
		}) scale(-1, 1), translate(${-12.5 - 25 * start[1]})`;
		drawHorseArrow(polygon, start, transform);
	}
}

function onMouseDown(e) {
	if (e.button == 2) {
		start = getRowCol(e.clientX, e.clientY);
		window.addEventListener("mouseup", onMouseUp);
	}
}

function onMouseUp(e) {
	end = getRowCol(e.clientX, e.clientY);
	createArrow(start, end);
	start = null;
	end = null;
	window.removeEventListener("mouseup", onMouseUp);
}

window.addEventListener("mousedown", onMouseDown);
