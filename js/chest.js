(function () {
    function Chest(stage, initial_x, initial_y) {
        this.x = initial_x;
        this.y = initial_y;
    };

    var p = createjs.extend(Chest, Item);

    window.Chest = createjs.promote(Chest, "Container");
}());
