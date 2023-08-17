import React, { Component } from "react";
import "./App.css";

class Paint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPainting: false,
      brushSize: 5,
      color: "#000000",
    };
  }

  componentDidMount() {
    this.canvas.addEventListener("mousedown", this.startPainting);
    this.canvas.addEventListener("mouseup", this.stopPainting);
    this.canvas.addEventListener("mousemove", this.paint);
    this.canvas.addEventListener("touchstart", this.startPaintingTouch);
    this.canvas.addEventListener("touchend", this.stopPainting);
    this.canvas.addEventListener("touchmove", this.paintTouch);
    window.addEventListener("resize", this.handleResize);
    this.handleResize(); // Initial resize
  }

  componentWillUnmount() {
    this.canvas.removeEventListener("mousedown", this.startPainting);
    this.canvas.removeEventListener("mouseup", this.stopPainting);
    this.canvas.removeEventListener("mousemove", this.paint);
    this.canvas.removeEventListener("touchstart", this.startPaintingTouch);
    this.canvas.removeEventListener("touchend", this.stopPainting);
    this.canvas.removeEventListener("touchmove", this.paintTouch);
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const canvas = this.canvas;
    canvas.width = Math.min(window.innerWidth * 0.8, 600);
    canvas.height = Math.min(window.innerHeight * 0.6, 400);
  };

  startPainting = () => {
    this.setState({ isPainting: true });
  };

  stopPainting = () => {
    this.setState({ isPainting: false });
  };

  paint = (event) => {
    const { isPainting, brushSize, color } = this.state;
    if (!isPainting) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  startPaintingTouch = (event) => {
    event.preventDefault();
    this.startPainting();
  };

  paintTouch = (event) => {
    const { isPainting, brushSize, color } = this.state;
    if (!isPainting) return;

    const rect = this.canvas.getBoundingClientRect();
    const canvasX = event.touches[0].clientX - rect.left;
    const canvasY = event.touches[0].clientY - rect.top;

    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const x = (canvasX / rect.width) * canvasWidth;
    const y = (canvasY / rect.height) * canvasHeight;

    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  handleClearCanvas = () => {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  handleBrushSizeChange = (event) => {
    this.setState({ brushSize: parseInt(event.target.value) });
  };

  handleColorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  handleDownloadImage = () => {
    const canvas = this.canvas;
    const link = document.createElement("a");
    link.download = "painting.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  render() {
    const { brushSize, color } = this.state;

    return (
      <div className="paint-page-content">
        <h1 className="paint-h1">Paint by Tom</h1>
        <div className="controls">
          <label>
            Brush Size:
            <select value={brushSize} onChange={this.handleBrushSizeChange}>
              <option value={1}>Extra Small</option>
              <option value={3}>Small</option>
              <option value={5}>Medium</option>
              <option value={10}>Large</option>
              <option value={20}>Extra Large</option>
            </select>
          </label>
          <label>
            Colour:
            <input
              type="color"
              value={color}
              onChange={this.handleColorChange}
            />
          </label>
        </div>
        <canvas
          ref={(ref) => (this.canvas = ref)}
          className="paint-canvas"
        ></canvas>
        <button className="clear" onClick={this.handleClearCanvas}>
          Clear Canvas
        </button>
        <button className="download" onClick={this.handleDownloadImage}>
          Download Image
        </button>
      </div>
    );
  }
}

export default Paint;
