function main() {
  router.on("/", rootPage);
  router.on("404", notFoundPage);
  router.on("/ocr", ocrPage);
  router.on("/room/:roomNumber", roomPage);
  router.on("/room/:roomNumber/report", reportPage);
  router.on("/room/:roomNumber/book", bookingPage);
  router.on("/admin", adminPage);
  router.on("/admin/dashboard", dashboardPage);
  router.redirect(window.location.pathname);
}
