var CallButler = CallButler || {};
CallButler.Models = CallButler.Models || {};

CallButler.Models.CallList = Backbone.Collection.extend({
    // Save all of the data under the `"call-butler-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("call-butler-backbone"),

    model: CallButler.Models.CallItem,

    comparator: function (model1, model2) {
        //returns:
        //  -1 : if date1 < date2
        //   1 : if date1 >= date2
        var date1 = model1.get("call_on"),
            date2 = model2.get("call_on");
        if (!date1) {
            return -1;
        }
        if (!date2) {
            return 1;
        }
        if (date1 < date2) {
            return -1;
        } else {
            return 1;
        }

    }
});
