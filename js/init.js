$(function ($) {
    // Initialize the application here.
    new CallButler.App({
        model: new CallButler.Models.CallList(),
        el: "#call-butler"
    });
});
