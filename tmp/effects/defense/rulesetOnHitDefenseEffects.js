var dice = require('igm-utils/igmBaseDice.js')


function DND5EOnHitDefenseEffects(){
	this.physicalDamage = function(damage, options){
		this.owner.applyDamage(damage)
	}
	this.elementalDamage = function(damage, options){
		this.owner.applyDamage(damage)
	}
}

module.exports = DND5EOnHitDefenseEffects


