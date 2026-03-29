import { useState } from "react";
import {
  DEFAULT_FORM,
} from "../constants/index.js";
import { FormArtifacts } from "./form-artifacts.jsx";
import { FormTalents } from "./form-talents.jsx";
import { FormWeapon } from "./form-weapon.jsx";
import { FormPortrait } from "./form-portrait.jsx";
import { BasicInfo } from "./form-base-info.jsx";

export const CharacterForm = ({ initialData, onSubmit, loading }) => {
  const [form, setForm] = useState({ ...DEFAULT_FORM, ...initialData });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(initialData?.img ?? null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setNum = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: Number(e.target.value) }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form, imageFile);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <BasicInfo form={form} set={set} setForm={setForm} setNum={setNum}/>
      <FormPortrait preview={preview} handleImageChange={handleImageChange} />
      <FormWeapon set={set} form={form} />
      <FormTalents setNum={setNum} form={form} />
      <FormArtifacts set={set} form={form} />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-amber-950 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-amber-950/30 border-t-amber-950 rounded-full animate-spin" />
        )}
        Save Character
      </button>
    </form>
  );
};
