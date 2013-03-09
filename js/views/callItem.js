var CallButler = CallButler || {};
CallButler.Views = CallButler.Views || {};

CallButler.Views.CallItem = Backbone.View.extend({

    template: _.template($('#call-item-tmpl').html()),

    tagName: "tr",

    className: "data",

    events: {
        "click .done": "markAsCalled",
        "click .edit": "showDetailsView"
    },

    initialize: function (options) {
        this.model.bind("change", this.render, this);
        /**
         * Use 'sync' event if you want to wait until the data is persisted to the server
         * or use {wait: true} in the options when saving the model
         */
        // this.model.bind("sync", this.render, this);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('called', this.model.get('called'));
        return this;
    },

    markAsCalled: function (event) {
        this.model.callDone();
    },

    showDetailsView: function (event) {
        new CallButler.Views.CallDetail({
            model: this.model,
            collection: this.model.collection
        });
    }
});
