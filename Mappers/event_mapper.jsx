import { Event } from '../Models/event_entity.jsx';

export class EventMapper {
  static toDatabase(event) {
    return {
      id: event.id,
      manager_id: event.managerId,
      groom_name: event.groomName,
      bride_name: event.brideName,
      groom_phone: event.groomPhone,
      bride_phone: event.bridePhone,
      groom_email: event.groomEmail,
      bride_email: event.brideEmail,
      ceremony_type: event.ceremonyType,
      ceremony_venue: event.ceremonyVenue,
      ceremony_datetime: event.ceremonyDatetime,
      reception_venue: event.receptionVenue,
      reception_datetime: event.receptionDatetime,
      officiant: event.officiant,
      legal_assistance: event.legalAssistance,
      groomsmen_count: event.groomsmenCount,
      bridesmaids_count: event.bridesmaidsCount,
      guest_count: event.guestCount,
      decoration: event.decoration,
      music: event.music,
      catering: event.catering,
      cake: event.cake,
      beverages: event.beverages,
      photo_video: event.photoVideo,
      party_favor: event.partyFavor,
      invitation: event.invitation,
      budget: event.budget,
      status: event.status,
      created_at: event.createdAt,
      updated_at: event.updatedAt
    };
  }

  static fromDatabase(row) {
    return new Event({
      id: row.id,
      managerId: row.manager_id,
      groomName: row.groom_name,
      brideName: row.bride_name,
      groomPhone: row.groom_phone,
      bridePhone: row.bride_phone,
      groomEmail: row.groom_email,
      brideEmail: row.bride_email,
      ceremonyType: row.ceremony_type,
      ceremonyVenue: row.ceremony_venue,
      ceremonyDatetime: row.ceremony_datetime,
      receptionVenue: row.reception_venue,
      receptionDatetime: row.reception_datetime,
      officiant: row.officiant,
      legalAssistance: row.legal_assistance,
      groomsmenCount: row.groomsmen_count,
      bridesmaidsCount: row.bridesmaids_count,
      guestCount: row.guest_count,
      decoration: row.decoration,
      music: row.music,
      catering: row.catering,
      cake: row.cake,
      beverages: row.beverages,
      photoVideo: row.photo_video,
      partyFavor: row.party_favor,
      invitation: row.invitation,
      budget: row.budget,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }
}

export default EventMapper;
