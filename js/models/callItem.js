var CallButler = CallButler || {};
CallButler.Models = CallButler.Models || {};

CallButler.Models.CallItem = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("call-butler-backbone"),

    defaults: {
        name: null,
        phone: null,
        call_on: null,
        called_on: null,
        called: false,
        notes: null
    },

    callDone: function () {
        this.save({
            called: !this.get("called"),
            called_on: new Date().format("yyyy-mm-dd h:MM:ss TT")
        });
    },

    parse: function (resp, options) {
        // Clean up data formats for display
        resp.phone = resp.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        if (resp.called_on) {
            resp.called_on = new Date(resp.called_on).format("yyyy-mm-dd h:MM:ss TT");
        }
        return resp;
    },

    validate: function (attrs, options) {
        // Ensure entered phone is actually digits
        var phone = attrs.phone.replace(/[^0-9]/g, '');
        if (phone.length != 10) {
            return "invalid phone number";
        }
    }
});
