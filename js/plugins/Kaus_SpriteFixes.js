//=============================================================================
// Kaus Sprite Fixes
// Kaus_SpriteFixes.js
// Version: 1.0
// Date Created: March 8, 2016
// Scripted By: Kaus
//=============================================================================

var Imported = Imported || {};
Imported.Kaus_SpriteFixes = 1.0;

//=============================================================================
/*:
 * @plugindesc v1.0 Fixes Sprite Issues on default settings.
 * @author Kaus
 */

Sprite_Character.prototype.startBalloon = function() {
    if (!this._balloonSprite) {
        this._balloonSprite = new Sprite_Balloon();
    }
    this._balloonSprite.setup(this._character.balloonId());
    this._balloonSprite.z = 30;
    this.parent.addChild(this._balloonSprite);
};

Spriteset_Map.prototype.createParallax = function() {
    this._parallaxName = $gameMap.parallaxName();
    if(this._parallaxName.charAt(0) == '!'){ this._parallax = new Sprite(); } 
    else{ this._parallax = new TilingSprite(); }
    this._parallax.bitmap = ImageManager.loadParallax(this._parallaxName);
    this._parallax.move(0, 0, Graphics.width, Graphics.height);
    this._baseSprite.addChild(this._parallax);
};

Spriteset_Map.prototype.updateParallax = function() {
    if (this._parallaxName !== $gameMap.parallaxName()) {
        this._parallaxName = $gameMap.parallaxName();

        if (this._parallax.bitmap && Graphics.isWebGL() != true) {
            this._canvasReAddParallax();
        } else {
            this._parallax.bitmap = ImageManager.loadParallax(this._parallaxName);
        }
    }
    if(this._parallaxName.charAt(0) == '!'){
        this._parallax.x = $gameMap.displayX() * -$gameMap.tileWidth();
        this._parallax.y =  $gameMap.displayY() * -$gameMap.tileHeight();
   }
   else if (this._parallax.bitmap) {
        this._parallax.origin.x = $gameMap.parallaxOx();
        this._parallax.origin.y =  $gameMap.parallaxOy();
    }
};

var Kaus_AnimationFix = Sprite_Animation.prototype.initMembers;
    Sprite_Animation.prototype.initMembers = function() {
        Kaus_AnimationFix.call(this);
        this.z = 30;
    };

