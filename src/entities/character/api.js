import { supabase } from '../../shared/api/supabase'

const BUCKET = 'characters'

const uploadImage = async (file) => {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file)
  if (error) {
    const msg = error.message.toLowerCase().includes('bucket')
      ? 'Storage bucket "characters" not found. Create it in Supabase Dashboard → Storage.'
      : error.message
    return { error: { message: msg } }
  }
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: publicUrl }
}

export const getAllCharacters = async (userId) => {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', userId)
    .order('party', { ascending: true })
  return { data, error }
}

export const getCharactersByParty = async (userId, party) => {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', userId)
    .eq('party', party)
  return { data, error }
}

export const getCharacterById = async (id) => {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export const createCharacter = async (fields, imageFile) => {
  let img = null
  let warning = null
  if (imageFile) {
    const { url, error } = await uploadImage(imageFile)
    if (error) warning = error.message
    else img = url
  }
  const { data, error } = await supabase
    .from('characters')
    .insert({ ...fields, img })
    .select()
    .single()
  return { data, error, warning }
}

export const updateCharacter = async (id, fields, imageFile) => {
  let img = fields.img ?? null
  let warning = null
  if (imageFile) {
    const { url, error } = await uploadImage(imageFile)
    if (error) warning = error.message
    else img = url
  }
  const { data, error } = await supabase
    .from('characters')
    .update({ ...fields, img })
    .eq('id', id)
    .select()
    .single()
  return { data, error, warning }
}

export const deleteCharacter = async (id) => {
  const { error } = await supabase.from('characters').delete().eq('id', id)
  return { error }
}
