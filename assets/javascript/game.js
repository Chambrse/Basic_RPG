$(document).ready(function () {

    var characterChooser = 0;

    var donaldTrump = {
        "attack": 25,
        "counter": 25,
        "health": 180
    }


    function selectCharacter(character) {
/*         var charString = '#' + character;
 */        var playerCharacter = $('#' + character).detach();
        $("#gameSpace").append(playerCharacter);
    }


    $(".cWrapper").on("click", function () {
        if (characterChooser == 0) {
            selectCharacter(this.id);
            characterChooser++;
        } else {

        }
    });



});
