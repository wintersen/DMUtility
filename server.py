import schema
import sqlite3 as sql
from flask import Flask, request, session, jsonify, render_template
# from time import gmtime, strftime


app = Flask(__name__, template_folder='static')
app.config['DEBUG'] = True

if __name__ == "__main__":
    app.run(port=5000)


# Make SQL cursor return dictionary
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

#################################################################################
# main
#################################################################################


@app.route("/")
def main():
    return render_template('/index.html')

#################################################################################
# login/register
#################################################################################

# login user
@app.route('/login', methods=['POST'])
def login():
    user = request.form['username']
    password = request.form['password']
    con = sql.connect("DM.db")
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.login_user, (user,password))
    temp = cur.fetchone()
    cur.close()
    # if user and password are not in users table, error message appears
    if user == temp['username']:
        session['username'] = user
        session['uid'] = temp['id']
        return jsonify({
            'auth': True,
            'user': temp,
        })
    else:
        return jsonify({
            'auth': False
        })


# Register user
@app.route('/register', methods=['POST'])
def register():
    first = request.form['firstreg']
    last = request.form['lastreg']
    user = request.form['userreg']
    password = request.form['passwordreg']
    passwordconf = request.form['passwordconfreg']
    if password == passwordconf:
	    con = sql.connect("DM.db", timeout=10)
	    con.row_factory = dict_factory
	    cur = con.cursor()
	    cur.execute(schema.create_users_table)
	    cur.execute(schema.create_creds_table)
        cur.execute(schema.register_user, (first, last, user))
        cur.execute(schema.add_cred, (user, password))
        con.commit()
        cur.close()
        con.close()
        return jsonify({
            'registered': True
        })
    else:
        return jsonify({
            'registered': False
        })

#################################################################################
# campaigns
#################################################################################

# gets all campaigns for a user
@app.route('/campaigns', methods=['GET'])
def get_campaigns():
	uid = session['uid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_campaigns_table)
    cur.execute(schema.get_campaigns, (uid))
    campaign_data = cur.fetchall()
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'campaigns': campaign_data
    })

# creates a new campaign for a user
@app.route('/newCampaign', methods=['POST'])
def new_campaign():
    uid = session['uid']
    name = request.form['newcampname']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_users_table)
    cur.execute(schema.create_campaigns_table)
    cur.execute(schema.new_campaign, (uid, name))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'created': True
    })

# deletes a campaign given the campaign ID
@app.route('/campaigns', methods=['DELETE'])
def delete_campaign():
    cid = request.form['cid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_campaigns_table)
    cur.execute(schema.delete_campaign, (cid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'deleted': True
    })

# updates a campaign status
@app.route('/setCampaignStatus', methods=['PUT'])
def set_campaign_status():
	cid = request.form['cid']
	status = request.form['request']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_campaigns_table)
    cur.execute(schema.set_campaign_status, (status, cid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
       'updated': True
    })

#################################################################################
# notes
#################################################################################

# gets all notes for a campaign
@app.route('/notes', methods=['GET'])
def get_notes():
    cid = request.form['cid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_notes_table)
    cur.execute(schema.get_notes, (cid))
    notes = cur.fetchall()
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'notes': notes
    })

# creates a note for a campaign
@app.route('/newNote', methods=['POST'])
def new_note():
    cid = request.form['cid']
    name = request.form['name']
    content = request.form['content']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_notes_table)
    cur.execute(schema.new_note, (cid, name, content))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'created': True
    })

# delete note
@app.route('/notes', methods=['DELETE'])
def delete_note():
    nid = request.form['nid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.delete_note, (nid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'deleted': True
    })

# edit note content
@app.route('/editNote', methods=['POST'])
def edit_note():
    nid = request.form['nid']
    name = request.form['name']
    content = request.form['content']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.editNote, (name, content, nid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'edited': True
    })

#################################################################################
# npcs
#################################################################################

# get npcs for a campaign
@app.route('/npcs', methods=['GET'])
def get_npcs():
    cid = request.form['cid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_npcs_table)
    cur.execute(schema.get_npcs, (cid))
    npcs = cur.fetchall()
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'npcs': npcs
    })

# new npc
@app.route('/newNpc', methods=['POST'])
def new_npc():
    cid = request.form['cid']
    lid = request.form['lid']
    name = request.form['name']
    occ = request.form['occupation']
    desc = request.form['desc']
    traits = request.form['traits']
    race = request.form['race']
    align = request.form['align']
    note = request.form['note']
    strength = request.form['str']
    dex = request.form['dex']
    scon = request.form['con']
    intel = request.form['int']
    wis = request.form['wis']
    char = request.form['chr']
    ac = request.form['ac']
    hp = request.form['hp']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_npcs_table)
    cur.execute(schema.new_npc, (cid, lid, name, occ, desc, traits, race, align, note, strength, dex, scon, intel, wis, char, ac, hp))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'created': True
    })

# delete npc
@app.route('/npcs', methods=['DELETE'])
def delete_npc():
    nid = request.form['nid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur.execute(schema.create_npcs_table)
    cur.execute(schema.delete_npc, (nid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'deleted': True
    })

# edit npc
@app.route('/editNpc', methods=['POST'])
def edit_npc():
    nid = request.form['nid']
    lid = request.form['lid']
    name = request.form['name']
    occ = request.form['occupation']
    desc = request.form['desc']
    traits = request.form['traits']
    race = request.form['race']
    align = request.form['align']
    note = request.form['note']
    strength = request.form['str']
    dex = request.form['dex']
    scon = request.form['con']
    intel = request.form['int']
    wis = request.form['wis']
    char = request.form['chr']
    ac = request.form['ac']
    hp = request.form['hp']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_npcs_table)
    cur.execute(schema.edit_npc, (lid, name, occ, desc, traits, race, align, note, strength, dex, scon, intel, wis, char, ac, hp, nid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'edited': True
    })

#################################################################################
# monsters
#################################################################################

# get monsters for a given campaign
@app.route('/monsters', methods=['GET'])
def get_monsters():
    cid = request.form['cid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_monsters_table)
    cur.execute(schema.get_monsters, (cid))
    monsters = cur.fetchall()
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'monsters': monsters
    })

# new monster
@app.route('/newMonster', methods=['POST'])
def new_monster():
    cid = request.form['cid']
    name = request.form['name']
    note = request.form['note']
    equipment = request.form['equip']
    strength = request.form['str']
    dex = request.form['dex']
    scon = request.form['con']
    intel = request.form['int']
    wis = request.form['wis']
    char = request.form['chr']
    ac = request.form['ac']
    hp = request.form['hp']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_monsters_table)
    cur.execute(schema.new_monster, (cid, name, note, equipment, strength, dex, scon, intel, wis, char, ac, hp))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'created': True
    })

# delete monster
@app.route('/monsters', methods=['DELETE'])
def delete_monster():
    mid = request.form['mid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_monsters_table)
    cur.execute(schema.delete_monster, (mid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'deleted': True
    })

# edit monster
@app.route('/editMonster', methods=['POST'])
def edit_monster():
    mid = request.form['mid']
    name = request.form['name']
    equipment = request.form['equip']
    note = request.form['note']
    strength = request.form['str']
    dex = request.form['dex']
    scon = request.form['con']
    intel = request.form['int']
    wis = request.form['wis']
    char = request.form['chr']
    ac = request.form['ac']
    hp = request.form['hp']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_monsters_table)
    cur.execute(schema.edit_monster, (name, equipment, note, strength, dex, scon, intel, wis, char, ac, hp))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'edited': True
    })

#################################################################################
# locations
#################################################################################

# get locations by campaign
@app.route('locations', methods=['GET'])
def get_locations():
    cid = request.form['cid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_locations_table)
    cur.execute(schema.get_locs, (cid))
    locs = cur.fetchall()
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'locations': locs
    })

# new location
@app.route('/newLocation', methods=['POST'])
def new_loc():
    cid = request.form['cid']
    name = request.form['name']
    x = request.form['xcoord']
    y = request.form['ycoord']
    desc = request.form['desc']
    note = request.form['note']
    services = request.form['services']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_locations_table)
    cur.execute(schema.new_loc, (cid, name, x, y, desc, note, services))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'created': True
    })

# delete location
@app.route('/locations', methods=['DELETE'])
def delete_loc():
    lid = request.form['lid']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_locations_table)
    cur.execute(schema.delete_loc, (lid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'deleted': True
    })

# edit location
@app.route('/editLocation', methods=['POST'])
def edit_loc():
    lid = request.form['lid']
    name = request.form['name']
    x = request.form['xcoord']
    y = request.form['ycoord']
    desc = request.form['desc']
    note = request.form['note']
    services = request.form['services']
    con = sql.connect("DM.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    cur.execute(schema.create_locations_table)
    cur.execute(schema.edit_loc, (name, x, y, desc, note, services, lid))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'edited': True
    })


app.secret_key = 'A0Zr76j/3yX R~X0H!jmN]LWX/,?RT'
