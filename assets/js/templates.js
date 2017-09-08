$(function() {

  // Navigation
  const nav_template = $("#nav_template").html();
  $("#nav").html(Mustache.render(nav_template, data));


});