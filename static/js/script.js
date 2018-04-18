$(document).ready(function(){
    $('#login-button').on('click', function() {
        $.ajax({
            url: '/login',
            data: $('#login-form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.auth === true){
                    localStorage.setItem('userdata', JSON.stringify(response.user));
                    $('#close-login').click();
                    let user = JSON.parse(localStorage.getItem('userdata'));
                    console.log(user);
                    $('#login').hide();
                    $('#campaignselect').show();
                    getCampaignTable();
                }else{
                    $('#errorMessageLogin').text('Username and password do not match.');
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    $('#register-button').on('click', function() {
        $.ajax({
            url: '/register',
            data: $('#register-form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
                if(response.registered === true){
                    $('#register-form').trigger("reset");
                    $('#errorMessageReg').text('Registration successful!')
                }else{
                    $('#errorMessageReg').text('Registration failed. Try again.')
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    // Submit new campaign
    $('#create-campaign').on('click', function(){
        $.ajax({
            url: '/newCampaign',
            data: $('#campaign-form').serialize(),
            type: 'POST',
            success: function(response) {
                if(response.created === true){
                    $('#campaign-form').trigger("reset");
                    $('#errorMessageCampaign').text('Successfully created new campaign.');
                    getCampaignTable();
                    // $('#close-create-campaign').click();
                }else{
                    $('#errorMessageCampaign').text('Creation failed. Try again.');
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    // submit new note
    $('#create-note').on('click', function(){
        $.ajax({
            url: '/newNote',
            data: $('#note-form').serialize(),
            type: 'POST',
            success: function(response) {
                if(response.created === true) {
                    $('#note-form').trigger("reset");
                    $('#errorMessageNote').text('Successfully created new note.');
                    getNotesTable();
                }else{
                    $('#errorMessageNote').text('Creation failed. Try again.');
                }
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    // create npc
    $('#create-npc').on('click', function(){
        $.ajax({
            url: '/newNpc',
            data: $('#npc-form').serialize(),
            type: 'POST',
            success: function(response) {
                if(response.created === true) {
                    $('#npc-form').trigger("reset");
                    $('#errorMessageNPC').text('Successfully created new NPC.');
                    // getNPCTable();
                }else{
                    $('#errorMessageNPC').text('Creation failed. Try again.');
                }
            },
            error: function(error){
                console.log(error);
            }
        });

    })

    $("#CampaignTableBody").on('click', function(e){
        console.log(e);
        if (e.target.id.includes('campaign-selection-button')) {
            cid = e.target.id.split("-")[3];
            openCampaign(cid);
            return;
        }
        temp = e.target.parentNode;
        for(i = 1;!temp.id.includes('campaign-selection-button'); i++){
            if (temp.parentNode.id === 'CampaignTableBody') {
                return;
            }
            temp = temp.parentNode;
        }
        cid = temp.id.split("-")[3];
        openCampaign(cid);
    });
    
    // get campaign list
    function getCampaignTable(){
        tempuser = localStorage.getItem('userdata');
        let parseduser;
        if (tempuser) {
            parseduser = JSON.parse(tempuser);
        }
        var uid = JSON.stringify(parseduser.id);
        $.ajax({
            url: '/campaigns',
            type: 'GET',
            success: function(response) {
                $('#CampaignTableBody').empty();
                response.campaigns.forEach(function(val){
                    $('#CampaignTableBody').append("<tr><td><button type='button' id='campaign-selection-button-" + val.id + 
                        "' class='btn btn-secondary brn-lg brn-block'><div class='row text-center'><div class='col-sm-4'>" + val.name + 
                        "</div><div class='col-sm-4'>" + val.status + "</div></div></button></td></tr>");
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function openCampaign(cid){
        $.ajax({
            url: '/setCampaign',
            type: 'POST',
            data: JSON.stringify(cid),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
                if (response.set) {
                    localStorage.setItem('cid', cid);
                    $('#campaignselect').hide();
                    $('#home').show();
                    console.log("CID: " + cid);
                    getNotesTable();
                    // getNPCTable();
                    // getMonsterTable();
                }
            },
            error: function(error) {
                console.log(error);
            }
        })
    }

    // get notes for campaign
    function getNotesTable(){
        cid = localStorage.getItem('cid');
        
        var node = document.getElementById("noteitem");
        
        $.ajax({
            url: '/notes',
            data: {
                cid: JSON.stringify(cid)
            },
            contentType: "application/json",
            dataType: "json",
            type: 'POST',
            success: function(response) {
                $('#notes-table').empty();
                response.notes.forEach(function(val){
                    $('#notes-table').append("<div id='notes-acc-" + val.id + 
                        "'><div class='card'><div id='notes-heading-" + val.id + 
                        "' class='card-header'><h5 class='mb-0'><button class='btn btn-link' data-toggle='collapse' data-target='#note-collapse-" + val.id + 
                        "' aria-expanded='false' aria-controls='note-collapse-" + val.id + 
                        "'>" + val.name + "</button></h5></div><div id='note-collapse-" + val.id + 
                        "' class='collapse' aria-labelledby='notes-heading-" + val.id + 
                        "' data-parent='#notes-acc-" + val.id + "'><div class='card-body'><p>" + val.content + 
                        "</p><button type='button' class='btn btn-primary btn-sm' id='banish-note-" + val.id +
                        "'>BANISH NOTE</button></div></div></div></div>");                    
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function getNPCTable(){
        cid = localStorage.getItem('cid');
        $.ajax({
            url: '/npcs',
            data: {
                cid: tempcid
            },
            contentType: "application/json",
            dataType: "json",
            type: 'GET',
            success: function(response) {
                $('#NPCTableBody').empty();
                response.npcs.forEach(function(val){
                    $('#NPCTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + 
                        val.occupation + "</td><td>" + val.description + "</td><td>" + val.traits + "</td><td>" + 
                        val.race + "</td><td>" + val.alignment + "</td><td>" + val.note + "</td><td>" + 
                        val.str + "</td><td>" + val.dex + "</td><td>" + val.con + "</td><td>" + val.int + "</td><td>" + 
                        val.wis + "</td><td>" + val.chr + "</td><td>" + val.ac + "</td><td>" + val.hp + "</td></tr>");
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function getMonsterTable(){
        tempcid = localStorage.getItem('cid');
        $.ajax({
            url: '/monsters',
            data: {
                cid: cid
            },
            contentType: "application/json",
            dataType: "json",
            type: 'GET',
            success: function(response) {
                $('#monster-table').empty();
                response.npcs.forEach(function(val){
                    $('#monster-table').append(
                        "<div id='monacc" + val.id + "'><div class='card'><div class='card-header' id='monhead" + val.id + "'><h5 class='mb-0'><button class='btn btn-link' data-toggle='collapse' data-target='#mon" + val.id + "' aria-expanded='false' aria-controls='mon" + val.id + "' id='mon_name'>" + val.name + "</button></h5></div><div id='mon" + val.id + "' class='collapse' aria-labelledby='monhead" + val.id + "' data-parent='#monacc" + val.id + "'><div class='card-body'><table class='table text-center'><thead><tr><th scope='col'>EQUIPMENT</th><th scope='col'>DESCRIPTION</th><th scope='col'>STATS</th></tr></thead><tbody><tr><td id='equip_td'>" + val.equipment + "</td><td id='m_desc_td'>" + val.description + "</td><td id='m_stats_td'><table style='margin: 0px auto'><thead><th>HP</th><th>AC</th><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHR</th></thead><tr><td id='mHP_td'>" + val.hp + "</td><td id='mAC_td'>" + val.ac +"</td><td id='mSTR_td'>" + val.str +"</td><td id='mDEX_td'>" + val.dex +"</td><td id='mCON_td'>" + val.con +"</td><td id='mINT_td'>" + val.int +"</td><td id='mWIS_td'>" + val.wis +"</td><td id='mCHR_td'>" + val.chr +"</td></tr></table></td></tr></tbody></table><button type='button' class='btn btn-primary btn-sm'>BANISH MONSTER</button></div></div></div></div>                 
                    );
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    function getLocationTable(){
        cid = localStorage.getItem('cid');
        $.ajax({
            url: '/locations',
            data: {
                cid: cid
            },
            contentType: "application/json",
            dataType: "json",
            type: 'GET',
            success: function(response) {
                $('#LocationTableBody').empty();
                response.npcs.forEach(function(val){
                    $('#LocationTableBody').append("<tr><td>" + val.id + "</td><td>" + val.name + "</td><td>" + 
                        val.xcoord + "</td><td>" + val.ycoord + "</td><td>" + val.description + "</td><td>" + 
                        val.note + "</td><td>" + val.services + "</td></tr>");
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
});
