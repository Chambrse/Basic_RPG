$(document).ready(function () {

    /* Initialize variables. */
    var characterChooser = true;
    var playerCharacterDiv;
    var enemyDiv;

    /* create and store attack button */
    var attackButton = $("<button>");
    attackButton.addClass("btn btn-primary attackButton");
    attackButton.text("Attack!");

    /* Character objects */
    var donaldTrump = {
        baseAttack: 10,
        attack: 25,
        counter: 25,
        health: 180
    }

    var sanders = {
        baseAttack: 10,
        attack: 25,
        counter: 25,
        health: 180
    }

    var conway = {
        baseAttack: 10,
        attack: 25,
        counter: 25,
        health: 180
    }

    /* Character select functions */
    function selectCharacter(character) {
        /* Store the character */
        playerCharacter = character;
        /* remove the character card and move it to game space */
        playerCharacterDiv = $('#' + character).detach();
        $("#gameSpace").append(playerCharacterDiv);
        /* add the attackbutton and corresponding event listener */
        $('#' + character).after(attackButton);
    }

    function selectEnemy(character) {
        enemy = character;
        enemyDiv = $('#' + character).detach();
        $("#enemySpace").append(enemyDiv);
    }

    /* Attack! - Note: eval() is used here. JJ says it is dangerous so hopefully there is an alternative. */
    function attack() {
        /* reduce the defender's health by the attacker's attack */
        eval(enemy).health -= eval(playerCharacter).attack;
        $('#' + enemy + '> .health').text(eval(enemy).health);
        /* reduce the attacker's health by the defender's counter attack */
        eval(playerCharacter).health -= eval(enemy).counter;
        $('#' + playerCharacter + '> .health').text(eval(playerCharacter).health);

        /* increase playerCharacter attack power */
        eval(playerCharacter).attack += eval(playerCharacter).baseAttack;

        /* Check if anyone died */
        if (eval(enemy).health <= 0 && eval(playerCharacter).health > 0) {
            $("#toolTip").text("Choose another opponent!"); 
            $('#' + enemy).detach();

        } else if (eval(playerCharacter).health <= 0) {
            
        }

    }

    $(".wrap").on("click", ".selectable", function () {
        if (characterChooser == true) {
            selectCharacter(this.id);
            characterChooser = false;
            $("#toolTip").text("Choose an opponent!");
            $('#' + this.id).removeClass("selectable");
        } else {
            selectEnemy(this.id);
            $(".character").removeClass("selectable");
        }
    });
    
    $("#gameSpace").on("click", ".attackButton", function () {
        console.log("test");
        attack();
    });

});
