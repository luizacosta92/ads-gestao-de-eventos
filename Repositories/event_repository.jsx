import EventMapper from '../Mappers/event_mapper.jsx';
import getDatabasePool from '../Database/connection.jsx';

export class EventRepository {
  constructor(db = getDatabasePool()) {
    this.db = db;
  }

  async create(event) {
    const data = EventMapper.toDatabase(event);
    const sql = `
      INSERT INTO events (
        manager_id,
        groom_name,
        bride_name,
        groom_phone,
        bride_phone,
        groom_email,
        bride_email,
        ceremony_type,
        ceremony_venue,
        ceremony_datetime,
        reception_venue,
        reception_datetime,
        officiant,
        legal_assistance,
        groomsmen_count,
        bridesmaids_count,
        guest_count,
        decoration,
        music,
        catering,
        cake,
        beverages,
        photo_video,
        party_favor,
        invitation,
        budget,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      data.manager_id,
      data.groom_name,
      data.bride_name,
      data.groom_phone,
      data.bride_phone,
      data.groom_email,
      data.bride_email,
      data.ceremony_type,
      data.ceremony_venue,
      data.ceremony_datetime,
      data.reception_venue,
      data.reception_datetime,
      data.officiant,
      data.legal_assistance,
      data.groomsmen_count,
      data.bridesmaids_count,
      data.guest_count,
      data.decoration,
      data.music,
      data.catering,
      data.cake,
      data.beverages,
      data.photo_video,
      data.party_favor,
      data.invitation,
      data.budget,
      data.status,
      data.created_at,
      data.updated_at
    ];

    const [result] = await this.db.query(sql, params);
    return result.insertId;
  }

  async update(id, event) {
    const data = EventMapper.toDatabase(event);
    const sql = `
      UPDATE events SET
        manager_id = ?,
        groom_name = ?,
        bride_name = ?,
        groom_phone = ?,
        bride_phone = ?,
        groom_email = ?,
        bride_email = ?,
        ceremony_type = ?,
        ceremony_venue = ?,
        ceremony_datetime = ?,
        reception_venue = ?,
        reception_datetime = ?,
        officiant = ?,
        legal_assistance = ?,
        groomsmen_count = ?,
        bridesmaids_count = ?,
        guest_count = ?,
        decoration = ?,
        music = ?,
        catering = ?,
        cake = ?,
        beverages = ?,
        photo_video = ?,
        party_favor = ?,
        invitation = ?,
        budget = ?,
        status = ?,
        created_at = ?,
        updated_at = ?
      WHERE id = ?
    `;

    const params = [
      data.manager_id,
      data.groom_name,
      data.bride_name,
      data.groom_phone,
      data.bride_phone,
      data.groom_email,
      data.bride_email,
      data.ceremony_type,
      data.ceremony_venue,
      data.ceremony_datetime,
      data.reception_venue,
      data.reception_datetime,
      data.officiant,
      data.legal_assistance,
      data.groomsmen_count,
      data.bridesmaids_count,
      data.guest_count,
      data.decoration,
      data.music,
      data.catering,
      data.cake,
      data.beverages,
      data.photo_video,
      data.party_favor,
      data.invitation,
      data.budget,
      data.status,
      data.created_at,
      data.updated_at,
      id
    ];

    const [result] = await this.db.query(sql, params);
    return result.affectedRows > 0;
  }

  async findById(id) {
    const sql = 'SELECT * FROM events WHERE id = ? LIMIT 1';
    const [rows] = await this.db.query(sql, [id]);
    return rows.length > 0 ? EventMapper.fromDatabase(rows[0]) : null;
  }

  async findAll() {
    const sql = 'SELECT * FROM events ORDER BY created_at DESC';
    const [rows] = await this.db.query(sql);
    return rows.map((row) => EventMapper.fromDatabase(row));
  }

  async delete(id) {
    const sql = 'DELETE FROM events WHERE id = ?';
    const [result] = await this.db.query(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default EventRepository;
