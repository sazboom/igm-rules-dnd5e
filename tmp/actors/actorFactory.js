var extend = require('util')._extend;
var dice = require('igm-utils/igmBaseDice.js');
var DND5EBaseActor = require('./rulesetBaseActor.js');
var DND5EBaseActionMixin = require('../actions/rulesetBaseAction.mixin.js');
var actionMixin = new DND5EBaseActionMixin();
var BaseAttack = require('../attacks/rulesetBaseAttack.js');
var BaseDefense = require('../defenses/rulesetBaseDefense.js');
var aaronSword = require('../Database/ogc/attacks/sword.js')['default'];
var magicMissile = require('../Database/ogc/attacks/magicMissile.js')['default'];
var fireball = require('../Database/ogc/attacks/fireball.js')['default'];
var aaronArmor = require('../Database/ogc/defenses/leather.js')['default'];
extend(aaronSword, dice);
extend(aaronArmor, dice);

function ActorFactory(){
	this.baseOptions = function(options){
		 var guid = Math.floor(Math.random()*1000)
		 var base = {
			 	guid : guid,
			 	attacks: [],
			 	defenses: [],
			 	attackBonus : options.attackBonus || 0,
			 	damageBonus : options.damageBonus || 0,
			  hitAvoidance : options.hitAvoidance || 0,
			  healthValue : options.healthValue || 10,
			  attributes : options.attributes || 
				{str:10,dex:10,con:10,wis:10,'int':10, cha:10}
			}
			return base

	}




	this.createCharacter = function(options){
		var attackArray = options.attackArray || [aaronSword, magicMissile]
		var options = options || {}
		var baseOptions= this.baseOptions(options)
		var character = new DND5EBaseActor({
			  type: options.type || 'character',
			  name: options.name || 'Hero',
			  desc: options.desc || 'A Hero',	 
			});
		extend(character, baseOptions);
		extend(character, actionMixin);
		for(var i in attackArray){
			character.attacks.push(new BaseAttack(character, attackArray[i]));	
		}
		character.defenses.push(new BaseDefense(character, aaronArmor));
		return character;
	}
	this.createEnemy = function(options){
		var attackArray = options.attackArray || [aaronSword, magicMissile]
		var options = options || {}
		var baseOptions= this.baseOptions(options)
		var enemy = new DND5EBaseActor({
			  type: options.type || 'enemy',
			  name: options.name || 'Enemy',
			  desc: options.desc || 'An Enemy',	
			});
		extend(enemy, baseOptions);
		extend(enemy, actionMixin);
		for(var i in attackArray){
			enemy.attacks.push(new BaseAttack(enemy, attackArray[i]));	
		}
		enemy.defenses.push(new BaseDefense(enemy, aaronArmor));
		return enemy;
	}
}

module.exports = ActorFactory;