
 $(document).ready(function(){
    //Re-directs user to fun fake stats sixers page
    $('#realStats').click(function(){
        window.location = 'https://developedbyscottmiller.herokuapp.com/Sixers/'; 
    }); 
    $('#addPlayer').submit(function(e){
        e.preventDefault(); 
        addPlayer(); 
    }); 
     $('#updatePlayer').submit(function(e){
        e.preventDefault(); 
        updatePlayer(); 
    }); 
      $('#deletePlayer').submit(function(e){
        e.preventDefault(); 
        deletePlayer(); 
    }); 
    setTimeout(function(){
         $('h1:first').text('Add a New Sixer!').css({'font-family': 'Montserrat','font-weight':'300','font-size':'3em','margin':'20px auto','padding': '0 40px', 'color': 'red'}); 
         $('h1:eq(1)').text('Update Stats!').css({'font-family': 'Montserrat','font-weight':'300','font-size':'3em','margin':'20px auto','padding': '0 40px', 'color': 'red'});   
    }, 000); 
    //AJAX call fetches any and all existing player data from database, forEach displays data
    $.ajax({
        url: "/data", 
        dataType: 'json',
        success: function(result){
            var dataTable = result;
            dataTable.forEach(function(el, i){
                $('#outer').prepend("<div class='datacell' id=" + el.name + "><h2>" + el.name + "</h2><p class='stats' id='ppg'>PPG: " + el.ppg + "</p><p class='stats' id='rpg'>RPG: " + el.rpg + "</p><p class='stats' id='apg'>APG: " + el.apg + "</p><p id='pic'><img src=" + el.pic +  " height='20%'></p></div>"); 
                });   
        }
    }); //Closes AJAX CALL 

    function addPlayer(){
       $.post( "/addPlayer", { name: $('#pname').val(), rpg: $('#prpg').val(), apg: $('#papg').val(), ppg: $('#pppg').val(), pic: $('#ppic').val()})
            .done(function( data ) {
                $('#pname').val(''); $('#prpg').val(''); $('#papg').val(''); $('#pppg').val(''); $('#ppic').val('');
                $('#outer').prepend("<div class='datacell' id=" + data.name + "><h2>" + data.name + "</h2><p class='stats'>PPG: " + data.ppg + "</p><p class='stats'>RPG: " + data.rpg + "</p><p class='stats'>APG: " + data.apg + "</p><p><img src=" + data.pic +  " height='20%'></p></div>"); 
        });
    }
      function updatePlayer(){
       var saved = {stat: $('#uStat').val(), newStat: $('#uUpStat').val()}; 
       $.post( "/update", { name: $('#uName').val(), stat: $('#uStat').val(), newStat: $('#uUpStat').val()})
            .done(function( data ) {
                console.log(data); 
                var firstName = data.name.split(' ')[0];
                console.log(firstName, $('#outer').children());  
                //$('#' + firstName).remove(); 
                $('#outer').find('#' + firstName).find('#' + saved.stat).text(saved.stat.toUpperCase() + ': ' + saved.newStat); 
                $('#uName').val(''); $('#uStat').val(''); $('#uUpStat').val('');
                //$('#outer').prepend("<div class='datacell'><h2>" + data.name + "</h2><p class='stats'>PPG: " + data.ppg + "</p><p class='stats'>RPG: " + data.rpg + "</p><p class='stats'>APG: " + data.apg + "</p><p><img src=" + data.pic +  " height='20%'></p></div>"); 
        });
    }
    function deletePlayer(){
       var name = $('#delName').val(); 
       $.post( "/remove", { delName: name})
       .done(function (data){
            console.log("RESPONSE", data);
            var firstName = data.name.split(' ')[0];  
            $('#' + firstName).remove(); 
       }); 
        // 
               // var firstName = data.name.split(' ')[0];  
                
       
    }

});

