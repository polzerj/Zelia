function compress(virtualScreen: HTMLCanvasElement) {
  let imgData = virtualScreen
    .getContext("2d")!
    .getImageData(0, 0, virtualScreen.width, virtualScreen.height);

  // get pixel data from image
  let data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] + data[i + 1] + data[i + 2] < 150) {
      // pixel is dark => make it black
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    } else {
      // => make it white
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }

  // try to minimize image
  let leftTopPoint = { x: virtualScreen.width, y: virtualScreen.height };
  let rightBottomPoint = { x: 0, y: 0 };

  for (let x = 0; x < imgData.width; x++) {
    for (let y = 0; y < imgData.height; y++) {
      let i = (imgData.width * y + x) * 4;

      if (data[i] + data[i + 1] + data[i + 2] == 0) {
        //
        if (x < leftTopPoint.x) leftTopPoint.x = x;
        if (y < leftTopPoint.y) leftTopPoint.y = y;
        if (x > rightBottomPoint.x) rightBottomPoint.x = x;
        if (y > rightBottomPoint.y) rightBottomPoint.y = y;
      }
    }
  }

  virtualScreen.getContext("2d")!.putImageData(imgData, 0, 0);

  // return bounds of the focus part
  return {
    top: leftTopPoint.y,
    left: leftTopPoint.x,
    width: rightBottomPoint.x - leftTopPoint.x,
    height: rightBottomPoint.y - leftTopPoint.y,
  };
}
