import { ChangeEvent } from "react"

interface LabelledInputType { 
    label : string, 
    placeholder : string, 
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
    type? : string
} 

export function LabelledInput({ label, placeholder, onChange, type} : LabelledInputType) { 
    return  <div>       
    <label className="block  text-sm font-bold  ">{label}</label>
    <input type={type || "text"} onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 mb-2" placeholder={placeholder} required />
</div>
}       