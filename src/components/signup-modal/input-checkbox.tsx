import React from 'react'
interface InputCheckboxProps {
  HandleCheckNewsChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  HandleChecConditionChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  isNewsLChecked: boolean
  isConditionChecked: boolean
}
export const InputCheckbox: React.FC<InputCheckboxProps> = ({
  isNewsLChecked,
  isConditionChecked,
  HandleCheckNewsChange,
  HandleChecConditionChange
}) => {
  return (
    <div>
      <div className="mt-6 flex gap-2">
        <input
          type="checkbox"
          checked={isNewsLChecked}
          onChange={HandleCheckNewsChange}
          id="nl"
          className="checked:bg-blue-500"
        />
        <label className="" htmlFor="nl">
          Je souhaite m'inscrire à la newsletter quotidienne !
        </label>
      </div>

      <div className="mt-3.5 mb-6 flex gap-2">
        <input
          type="checkbox"
          checked={isConditionChecked}
          onChange={HandleChecConditionChange}
          id="cng"
          className="checked:bg-blue-500"
        />
        <label className="" htmlFor="cng">
          J'ai lu et j'accepte les Conditions Générales d'Utilisation ainsi que
          la Politique de confidentialité
        </label>
      </div>
    </div>
  )
}
