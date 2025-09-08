"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const formatDate = (date: string, year: string) => {
  if (!date && !year) return ""
  const monthNames = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ]
  const monthIndex = Number(date) - 1
  const monthName = monthNames[monthIndex] || ""
  return `${monthName} ${year || ""}`.trim()
}

export const Experience: React.FC = () => {
  const { register, control, watch, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  })

  const [openFields, setOpenFields] = useState<number[]>([])

  useEffect(() => {
    if (fields.length === 0) {
      handleAddNew()
    } else if (fields.length === 1 && openFields.length === 0) {
      setOpenFields([0])
    }
  }, [fields.length, openFields.length])

  const watchFieldArray = watch("workExperience") || []

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })

  const handleAddNew = () => {
    setOpenFields([])
    const newIndex = fields.length
    append({
      title: "",
      company: "",
      location: "",
      startDate: "",
      startYear: "",
      endDate: "",
      endYear: "",
      current: false,
      description: "",
    })
    setTimeout(() => {
      setOpenFields([newIndex])
    }, 0)
  }

  const collapseField = (index: number) => {
    setOpenFields((prev) => prev.filter((i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {controlledFields.map((field, index) => {
        const isOpen = openFields.includes(index)
        return (
          <div key={field.id} className="mb-4 border rounded-lg">
            {!isOpen && (
              <div
                className="flex items-center justify-between w-full p-3 bg-[#F8F8F8] hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                onClick={() => setOpenFields((prev) => [...prev, index])}
              >
                <div className="flex items-center space-x-2 flex-grow">
                  <span className="text-gray-800 text-sm">
                    {field.title || field.company ? `${field.title} - ${field.company}` : "Ny erfarenhet"}
                  </span>
                  <p className="text-gray-500 text-sm">
                    {formatDate(field.startDate, field.startYear)} -{" "}
                    {field.current ? "Nuvarande" : formatDate(field.endDate, field.endYear)}
                  </p>
                </div>
                <Edit className="h-4 w-4 text-gray-400" />
              </div>
            )}

            {isOpen && (
              <div
                className="bg-white rounded-lg border-t p-6 space-y-4 mt-0 relative"
                style={{ minHeight: "225px", paddingBottom: "70px" }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1 text-xs text-gray-600">Titel</Label>
                    <Input
                      {...register(`workExperience.${index}.title`)}
                      className="bg-zinc-100 h-8 text-sm"
                      placeholder="t.ex. Utvecklare"
                    />
                  </div>
                  <div>
                    <Label className="mb-1 text-xs text-gray-600">Företag</Label>
                    <Input
                      {...register(`workExperience.${index}.company`)}
                      className="bg-zinc-100 h-8 text-sm"
                      placeholder="t.ex. Google"
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-1 text-xs text-gray-600">Plats</Label>
                  <Input
                    {...register(`workExperience.${index}.location`)}
                    className="bg-zinc-100 h-8 text-sm"
                    placeholder="t.ex. Stockholm"
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-4">
                  <div>
                    <Label className="mb-1 text-xs text-gray-600">Startdatum</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        {...register(`workExperience.${index}.startDate`)}
                        className="h-8 rounded-md border border-input bg-zinc-100 px-3 py-2 text-sm ring-offset-background w-full"
                      >
                        <option value="">Välj månad</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = new Date(0, i).toLocaleString("sv-SE", { month: "long" })
                          return (
                            <option key={i} value={i + 1}>
                              {capitalizeFirstLetter(month)}
                            </option>
                          )
                        })}
                      </select>
                      <select
                        {...register(`workExperience.${index}.startYear`)}
                        className="h-8 rounded-md border border-input bg-zinc-100 px-3 py-2 text-sm ring-offset-background w-full"
                      >
                        <option value="">Välj år</option>
                        {Array.from({ length: 50 }, (_, i) => {
                          const year = new Date().getFullYear() - i
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label className="mb-1 text-xs text-gray-600">Slutdatum</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        {...register(`workExperience.${index}.endDate`)}
                        className="h-8 rounded-md border border-input bg-zinc-100 px-3 py-2 text-sm ring-offset-background w-full"
                        disabled={field.current}
                      >
                        <option value="">Välj månad</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = new Date(0, i).toLocaleString("sv-SE", { month: "long" })
                          return (
                            <option key={i} value={i + 1}>
                              {capitalizeFirstLetter(month)}
                            </option>
                          )
                        })}
                      </select>
                      <select
                        {...register(`workExperience.${index}.endYear`)}
                        className="h-8 rounded-md border border-input bg-zinc-100 px-3 py-2 text-sm ring-offset-background w-full"
                        disabled={field.current}
                      >
                        <option value="">Välj år</option>
                        {Array.from({ length: 50 }, (_, i) => {
                          const year = new Date().getFullYear() - i
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pb-2">
                    <Label className="text-xs text-gray-600">Nutid</Label>
                    <Switch
                      checked={field.current}
                      onCheckedChange={(checked) => {
                        setValue(`workExperience.${index}.current`, checked)
                        if (checked) {
                          setValue(`workExperience.${index}.endDate`, "")
                          setValue(`workExperience.${index}.endYear`, "")
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-1 text-xs text-gray-600">Beskrivning</Label>
                  <RichTextEditor
                    name={`workExperience.${index}.description`}
                    control={control}
                    defaultValue={field.description}
                  />
                </div>

                <div className="absolute right-4 flex space-x-2" style={{ bottom: "20px" }}>
                  <Button
                    variant="default"
                    size="sm"
                    style={{
                      backgroundColor: "#00bf63",
                      color: "#fff",
                      fontSize: "0.875rem",
                      padding: "0.5rem 1rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      collapseField(index)
                    }}
                  >
                    KLAR
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      remove(index)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      })}
      <Button onClick={handleAddNew} variant="outline" size="sm" className="w-full text-xs px-4 py-2 mt-4">
        <Plus className="h-3 w-3 mr-2" />
        Lägg till arbetserfarenhet
      </Button>
    </div>
  )
}

export default Experience
