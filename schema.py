#################################################################################
# schema.py                                                                     #
#                                                                               #
# Stores the DB schema and all necessary queries for the server                 #
#################################################################################

#################################################################################
# users table
#################################################################################
create_users_table = "CREATE TABLE IF NOT EXISTS users(" \
              "id        INTEGER PRIMARY KEY AUTOINCREMENT," \
              "firstname TEXT    NOT NULL," \
              "lastname  TEXT," \
              "username  TEXT    UNIQUE NOT NULL)" \

register_user = "INSERT INTO users(firstname, lastname, username) VALUES (?,?,?);"

#################################################################################
# creds table
#################################################################################
create_creds_table = "CREATE TABLE IF NOT EXISTS creds(" \
                  "user TEXT UNIQUE," \
                  "pass TEXT," \
                  "CONSTRAINT fk_creds FOREIGN KEY (user) " \
                  "REFERENCES users(username) ON DELETE CASCADE)"

add_cred = "INSERT INTO creds(user, pass) VALUES (?,?);"

login_user = "SELECT users.* FROM users, creds WHERE username=user AND username=? AND pass=?"

#################################################################################
# campaigns table
#################################################################################
create_campaigns_table = "CREATE TABLE IF NOT EXISTS campaigns(" \
                "id           INTEGER PRIMARY KEY AUTOINCREMENT," \
                "owner        INTEGER," \
                "name         TEXT    NOT NULL," \
                "status       TEXT    NOT NULL," \
                "CONSTRAINT fk_campaigns FOREIGN KEY (owner) " \
                "REFERENCES users(id) ON DELETE CASCADE)"

new_campaign = "INSERT INTO campaigns(owner, name, status) VALUES (?,?,'not started');"

get_campaigns = "SELECT * FROM campaigns WHERE owner=?"

delete_campaign = "DELETE FROM campaigns WHERE id=?"

set_campaign_status = "UPDATE campaigns SET status=? WHERE id=?"

#################################################################################
# notes table
#################################################################################
create_notes_table = "CREATE TABLE IF NOT EXISTS notes(" \
                  "id          INTEGER PRIMARY KEY AUTOINCREMENT," \
                  "campaign_id INTEGER," \
                  "name        TEXT    NOT NULL," \
                  "content     TEXT    NOT NULL, " \
                  "CONSTRAINT fk_notes FOREIGN KEY (campaign_id) " \
                  "REFERENCES campaigns(id) ON DELETE CASCADE)"

new_note = "INSERT INTO notes(campaign_id, name, content) VALUES (?,?,?);"

get_notes = "SELECT * FROM notes WHERE campaign_id=?"

delete_note = "DELETE FROM notes WHERE id=?"

edit_note = "UPDATE notes SET name=?, content=? WHERE id=?"

edit_note_content = "UPDATE notes SET content=? WHERE id=?"

#################################################################################
# npcs table
#################################################################################
create_npcs_table = "CREATE TABLE IF NOT EXISTS npcs(" \
                  "id          INTEGER PRIMARY KEY AUTOINCREMENT," \
                  "campaign_id INTEGER," \
                  "loc_id      TEXT," \
                  "name        TEXT    NOT NULL," \
                  "occupation  TEXT," \
                  "description TEXT," \
                  "traits      TEXT," \
                  "race        TEXT," \
                  "alignment   TEXT," \
                  "note        TEXT," \
                  "str         INTEGER NOT NULL," \
                  "dex         INTEGER NOT NULL," \
                  "con         INTEGER NOT NULL," \
                  "int         INTEGER NOT NULL," \
                  "wis         INTEGER NOT NULL," \
                  "chr         INTEGER NOT NULL," \
                  "ac          INTEGER NOT NULL," \
                  "hp          INTEGER NOT NULL," \
                  "CONSTRAINT fk_npcs FOREIGN KEY (campaign_id) " \
                  "REFERENCES campaigns(id) ON DELETE CASCADE)"

new_npc = "INSERT INTO npcs(campaign_id, loc_id, name, occupation, description, traits, race, alignment, note, str, dex, con, int, wis, chr, ac, hp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

get_npcs = "SELECT * FROM npcs WHERE campaign_id=?"

delete_npc = "DELETE FROM npcs WHERE id=?"

edit_npc = "UPDATE npcs SET loc_id=?, name=?, occupation=?, description=?, traits=?, race=?, alignment=?, note=?, str=?, dex=?, con=?, int=?, wis=?, chr=?, ac=?, hp=? WHERE id=?"

set_npc_loc = "UPDATE npcs SET loc_id=? WHERE id=?"

set_npc_description = "UPDATE npcs SET description=? WHERE id=?"

set_npc_traits = "UPDATE npcs SET traits=? WHERE id=?"

set_npc_alignment = "UPDATE npcs SET alignment=? WHERE id=?"

set_npc_note = "UPDATE npcs SET note=? WHERE id=?"

set_npc_stats = "UPDATE npcs SET str=?, dex=?, con=?, int=?, wis=?, chr=?, ac=?, hp=? WHERE id=?"

set_npc_str = "UPDATE npcs SET str=? WHERE id=?"

set_npc_dex = "UPDATE npcs SET dex=? WHERE id=?"

set_npc_con = "UPDATE npcs SET con=? WHERE id=?"

set_npc_int = "UPDATE npcs SET int=? WHERE id=?"

set_npc_wis = "UPDATE npcs SET wis=? WHERE id=?"

set_npc_chr = "UPDATE npcs SET chr=? WHERE id=?"

set_npc_ac = "UPDATE npcs SET ac=? WHERE id=?"

set_npc_hp = "UPDATE npcs SET hp=? WHERE id=?"

#################################################################################
# monsters table
#################################################################################
create_monsters_table = "CREATE TABLE IF NOT EXISTS monsters(" \
                  "id INTEGER PRIMARY KEY AUTOINCREMENT," \
                  "campaign_id INTEGER NOT NULL," \
                  "name        TEXT    NOT NULL," \
                  "equipment   TEXT," \
                  "note        TEXT," \
                  "str         INTEGER NOT NULL," \
                  "dex         INTEGER NOT NULL," \
                  "con         INTEGER NOT NULL," \
                  "int         INTEGER NOT NULL," \
                  "wis         INTEGER NOT NULL," \
                  "chr         INTEGER NOT NULL," \
                  "ac          INTEGER NOT NULL," \
                  "hp          INTEGER NOT NULL," \
                  "CONSTRAINT fk_monsters FOREIGN KEY (campaign_id) " \
                  "REFERENCES campaigns(id) ON DELETE CASCADE)"

new_monster = "INSERT INTO monsters(campaign_id, name, note, equipment, str, dex, con, int, wis, chr, ac, hp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"

get_monsters = "SELECT * FROM monsters WHERE campaign_id=?"

delete_monster = "DELETE FROM monsters WHERE id=?"

edit_monster = "UPDATE monsters SET name=?, equipment=?, note=?, str=?, dex=?, con=?, int=?, wis=?, chr=?, ac=?, hp=? WHERE id=?"

set_monster_equipment = "UPDATE monsters SET equipment=? WHERE id=?"

set_monster_note = "UPDATE monsters SET note=? WHERE id=?"

set_monster_stats = "UPDATE monsters SET str=?, dex=?, con=?, int=?, wis=?, chr=?, ac=?, hp=? WHERE id=?"

set_monster_str = "UPDATE monsters SET str=? WHERE id=?"

set_monster_dex = "UPDATE monsters SET dex=? WHERE id=?"

set_monster_con = "UPDATE monsters SET con=? WHERE id=?"

set_monster_int = "UPDATE monsters SET int=? WHERE id=?"

set_monster_wis = "UPDATE monsters SET wis=? WHERE id=?"

set_monster_chr = "UPDATE monsters SET chr=? WHERE id=?"

set_monster_ac = "UPDATE monsters SET ac=? WHERE id=?"

set_monster_hp = "UPDATE monsters SET hp=? WHERE id=?"
