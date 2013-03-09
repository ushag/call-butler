var CallButler = CallButler || {};

CallButler.App = Backbone.View.extend({

    events: {
        "click #add": "add"
    },

    // cache your views when redrawing to completely delete the old ones
    // otherwise, you will start chasing rabbit holes as to what just happened!
    _views: [],

    initialize: function () {
        this.model.bind("reset", this.renderAll, this);
        this.model.bind("sort", this.renderAll, this);
        this.model.bind("error", this.renderError, this);
        // Bind first and then fetch
        this.model.fetch();
    },

    render: function (callModel) {
        var itemView = new CallButler.Views.CallItem({model: callModel});
        // Cache the new view
        this._views.push(itemView);
        // Add to DOM
        this.$el.find("table").append(itemView.render().el);
    },

    renderAll: function (event) {
        _.each(this._views, function(view){
            view.model.unbind(null, null, view);
            // Only for DOM events
            view.undelegateEvents();
            // Remove view from DOM
            view.remove();
        });
        //
        this._views = [];
        _.each(this.model.models, function (callModel) {
            this.render(callModel);
        }, this);
        return this;
    },

    renderError: function (model, errorMessage, options) {
        alert("Error saving on the server: " + this.errorMessage);
    },

    add: function (event) {
        var newCallModel = new CallButler.Models.CallItem();
        // Can do this but will be left with empty models in collection
        // add - by default sorts, no way to silence it so you will end up redrawing multiple times
        // this.model.add(newCallModel);
        new CallButler.Views.CallDetail({
            model: newCallModel,
            collection: this.model
        });
    }
});
