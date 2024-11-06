export const PADDING_HORIZONTAL = 7;
export const PADDING_VERTICAL = 40;
export const IDLE_LOGOUT_TIME_LIMIT = 1 * 60 * 1000;
export const INACTIVITY_CHECK_INTERVAL_MS = 1000;

export function extractSelect(data, keyProperty, valueProperty) {
  return data?.map(item => ({
    key: item[keyProperty]?.toString(),
    value: item[valueProperty],
  }));
}

export function getObjectById(array, id) {
  return array.find(item => item.id === id);
}
export const urlRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

export const localGovernments = [
  {key: 'Agege', value: 'Agege'},
  {key: 'Ajeromi-Ifelodun', value: 'Ajeromi-Ifelodun'},
  {key: 'Alimosho', value: 'Alimosho'},
  {key: 'Amuwo-Odofin', value: 'Amuwo-Odofin'},
  {key: 'Apapa', value: 'Apapa'},
  {key: 'Badagry', value: 'Badagry'},
  {key: 'Epe', value: 'Epe'},
  {key: 'Eti-Osa', value: 'Eti-Osa'},
  {key: 'Ibeju-Lekki', value: 'Ibeju-Lekki'},
  {key: 'Ikeja', value: 'Ikeja'},
  {key: 'Ikorodu', value: 'Ikorodu'},
  {key: 'Ikorodu North', value: 'Ikorodu North'},
  {key: 'Imota', value: 'Imota'},
  {key: 'Isolo', value: 'Isolo'},
  {key: 'Kosofe', value: 'Kosofe'},
  {key: 'Lagos Island', value: 'Lagos Island'},
  {key: 'Lagos Mainland', value: 'Lagos Mainland'},
  {key: 'Mushin', value: 'Mushin'},
  {key: 'Ojo', value: 'Ojo'},
  {key: 'Oshodi-Isolo', value: 'Oshodi-Isolo'},
  {key: 'Somolu', value: 'Somolu'},
  {key: 'Surulere', value: 'Surulere'},
  {key: 'Talata Mafara', value: 'Talata Mafara'},
  {key: 'Yaba', value: 'Yaba'},

  // Kano Local Governments
  {key: 'Dala', value: 'Dala'},
  {key: 'Gwale', value: 'Gwale'},
  {key: 'Kano Municipal', value: 'Kano Municipal'},
  {key: 'Nassarawa', value: 'Nassarawa'},
  {key: 'Tarauni', value: 'Tarauni'},
  {key: 'Ungogo', value: 'Ungogo'},
  {key: 'Warawa', value: 'Warawa'},
  {key: 'Kumbotso', value: 'Kumbotso'},

  // Ibadan Local Governments
  {key: 'Ibadan North', value: 'Ibadan North'},
  {key: 'Ibadan North East', value: 'Ibadan North East'},
  {key: 'Ibadan North West', value: 'Ibadan North West'},
  {key: 'Ibadan South East', value: 'Ibadan South East'},
  {key: 'Ibadan South West', value: 'Ibadan South West'},
  {key: 'Ibarapa Central', value: 'Ibarapa Central'},
  {key: 'Ibarapa East', value: 'Ibarapa East'},
  {key: 'Ibarapa North', value: 'Ibarapa North'},
  {key: 'Iddo', value: 'Iddo'},
  {key: 'Irepo', value: 'Irepo'},
  {key: 'Lagelu', value: 'Lagelu'},
  {key: 'Ogo Oluwa', value: 'Ogo Oluwa'},
  {key: 'Ogbomoso North', value: 'Ogbomoso North'},
  {key: 'Ogbomoso South', value: 'Ogbomoso South'},
  {key: 'Olorunsogo', value: 'Olorunsogo'},
  {key: 'Oluyole', value: 'Oluyole'},
  {key: 'Ona Ara', value: 'Ona Ara'},
  {key: 'Orelope', value: 'Orelope'},
  {key: 'Ori Ire', value: 'Ori Ire'},
  {key: 'Saki East', value: 'Saki East'},
  {key: 'Saki West', value: 'Saki West'},
  {key: 'Surulere', value: 'Surulere'},
  {key: 'Akinyele', value: 'Akinyele'},
  {key: 'Afijio', value: 'Afijio'},
  {key: 'Atiba', value: 'Atiba'},
  {key: 'Atigbo', value: 'Atigbo'},
];
