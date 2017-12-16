function Weapon(pos_x, pos_y, hitbox_x, hitbox_y, damage_points, life) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;

    this.hitbox_x = hitbox_x;
    this.hitbox_y = hitbox_y;

    this.life = life;

    this.damage_points = damage_points;
}

Weapon.prototype.tick = function () {
    this.life -= 1;

    return Boolean(this.life)
}

Weapon.prototype.affect = function (human) {
    human.deal_damage(this.damage_points)
}

Weapon.prototype.move = function () {}

Weapon.prototype.draw = function () {
    // Display dis shi*
}


function FlyingWeapon(pos_x, pos_y, v_x, v_y, hitbox_x, hitbox_y, damage_points, life) {
    Weapon.call(this, pos_x, pos_y, hitbox_x, hitbox_y, damage_points, life)

    this.v_x = v_x
    this.v_y = v_y
}

FlyingWeapon.prototype.move = function () {
    this.pos_x += this.v_x
    this.pos_y += this.v_y
}
