var CallButler = CallButler || {};
CallButler.Views = CallButler.Views || {};

CallButler.Views.CallDetail = Backbone.View.extend({
    // el: "call-detail", //<-- not going to work

    template: _.template($('#call-detail-tmpl').html()),

    events: {
        "click .save": "save",
        "click .cancel": "cancel"
    },

    initialize: function (options) {
        this.model.bind("change", this.render, this);
        this.model.bind("invalid", this.renderValidationError, this);
        this.model.bind("error", this.renderError, this);
        this.render();
    },

    render: function () {
        // create HTML and set to el
        this.$el.html(this.template(this.model.toJSON()));
        $("#call-detail")
            .html(this.el);
    },

    cancel: function () {
        if (this.model.isNew()) {
            // user pre-emptively cancelled without adding any data
            this.model.destroy();
        }
        this.remove();
    },

    save: function (event) {
        var modelObject = this.buildModel(this.$el.find("[data-model]"));
        var addToColl = false;
        if(this.model.isNew()) {
            addToColl = true;
        }
        if (this.model.save(modelObject, {wait: true})) {
            if (addToColl) {
                // Resort the collection on adding this new data model
                this.collection.add(this.model);
            } else {
                this.collection.sort();
            }
            // Remove the view
            this.remove();
        }
    },

    renderError: function (model, errorMessage, options) {
        alert("Error saving on the server: " + this.errorMessage);
    },

    renderValidationError: function () {
        alert("Error validating data: " + this.model.validationError);
    },

    // Parse form fields to build call object
    buildModel: function (fields) {
        var modelObject = {};
        _.each(fields, function (field) {
            var modelProperty = $(field).data("model");
            if (modelProperty) {
                var fieldVal;
                if (field.tagName.toLowerCase() == "select") {
                    fieldVal = $(field).filter(":selected").val();
                }
                else {
                    fieldVal = $(field).val();
                }
                modelObject[modelProperty.split(".")] = $.trim($(field).val());
            }
        }, this);

        return modelObject;
    }
});
