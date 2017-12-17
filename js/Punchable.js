(function() {
    function Weapon(life, angle) {
        this.Container_constructor();
        
        this.life = life; // number of ticks for weapon to act
        this.angle = angle; // angle (degrees) of attack, only multiples of 90
    }

    var p = createjs.extend(Weapon, createjs.Container);
    
    p.setup = function () {
        
    }
    
    p.is_dead = function () {
        return Boolean(--this.life);
    };
    
    
    
    window.Weapon = createjs.promote(Throwable, "Container");
}());