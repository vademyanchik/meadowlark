/**
 * Created by vadim on 16.12.2016.
 */
module.exports = {
    checkWaivers: function (req, res, next) {
        var cart = req.session.cart;
        if (!cart) return next();
        if (cart.items.some(function (item) {
                return item.product.requiresWaiver;
            })) {
            if (!cart.warnings) cart.warnings = [];
            cart.warnings.push('One or more of your selected tours requires a waiver.');
        }
        next();
    },

    checkGuestCounts: function (req, res, next) {
        var cart = req.session.cart;
        if (!cart) return next();
        if (cart.items.some(function (item) {
                return item.guests > item.product.maximumGuests;
            })) {
            if (!cart.errors) cart.errors = [];
            cart.errors.push('One or more of your selected tours cannot accommodate the ' +
                'number of guests you have selected.');
        }
        next();
    }
};