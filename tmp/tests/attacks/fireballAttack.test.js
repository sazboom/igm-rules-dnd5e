var assert = require('chai').assert;


describe('Fireball', function(){
  before(function(){
    fireball = require('../../Database/ogc/attacks/fireball.js')['default'];
    var ActorFactory = require('../../actors/actorFactory.js');
    actorFactory = new ActorFactory();

  })

  beforeEach(function(){
  	dnd5ePC = actorFactory.createCharacter({
      attackArray : [fireball]
    });
  	dnd5eEnemy1 = actorFactory.createEnemy({}); 
  	dnd5eEnemy2 = actorFactory.createEnemy({});
  	attackAction = dnd5ePC.createAction(
      'Attack', 
      {}, 
      [dnd5eEnemy1, dnd5eEnemy2], 
      {
        attack:dnd5ePC.attacks[0]
      }

    )
    
  })


	function eachSubAttack(conflicts, callback){

		  for(var y in conflicts){
		    var conflict = conflicts[y];
		    callback(conflict)
		}	
		
	}

	it('PC should have sub actions', function(){
		assert.equal(attackAction.conflicts.length, 2)
	})
	describe("Attack Value", function(){

      it('should have an attack value between 0 and 25 ', function(){

  		eachSubAttack(attackAction.conflicts, function(conflict){
            var av = conflict.calculateAttackValue()
            assert.isAbove(av, 0)
            assert.isBelow(av, 25)
  		})
           
        
      })

    
  	})

  //----- PHASE - HIT AVOIDANCE - HA ------------
  //
  //Calculate Hit Avoidance number.  Include buffs or debuffs to avoidance effecting defender
  //
  //Compare Hit HA with AV
  //
  describe("Hit Avoidance", function(){
      it('check if Hit or Miss', function(){
      	eachSubAttack(attackAction.conflicts, function(conflict){
            var AV = conflict.calculateAttackValue()
            var HA = conflict.calculateHitAvoidance()
            if(AV > HA){
              assert.isTrue(conflict.isHit())
            }
            else
            {
              assert.isFalse(conflict.isHit())
            }
                
        })
      });
  })
  describe("On Hit", function(){
    it('will affect Health ', function(){
          eachSubAttack(attackAction.conflicts, function(conflict){
            var hp = conflict.defender.healthValue  
            conflict.onHit()
            assert.isBelow(conflict.defender.healthValue, hp)

          })
    })
  })
})



