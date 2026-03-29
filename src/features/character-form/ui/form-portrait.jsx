import { useRef } from "react";
import { FormSection } from "../../../shared/ui/FormSection.jsx";

export const FormPortrait = ({preview, handleImageChange}) => {
	const fileRef = useRef(null); 

	return <FormSection title="Portrait">
        <div
          onClick={() => fileRef.current?.click()}
          className="relative aspect-[3/4] max-w-[180px] rounded-xl overflow-hidden bg-slate-800 border-2 border-dashed border-slate-700 hover:border-amber-500/50 cursor-pointer transition-colors flex items-center justify-center"
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="text-center text-slate-500 px-4">
              <p className="text-3xl mb-2">🖼</p>
              <p className="text-xs">Click to upload</p>
            </div>
          )}
          {preview && (
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
              Change image
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </FormSection>
}