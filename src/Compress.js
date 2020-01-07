export default function(file, canvas) {
  let newImg1 = new Image();
  newImg1.src = file;
  while (file.size >= 2000000) {
    canvas.toDataURL("image/jpeg", 0.9);
  }
}
