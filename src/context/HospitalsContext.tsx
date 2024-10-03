/**
 *  HospitalsContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import {ReactNode, createContext, useEffect, useState} from "react";
import {HospitalInfo} from "../models/hospitalInfo";
import {FilterType} from "../types/fillterType";

interface HospitalContextType {
    originals: HospitalInfo[];
    setOriginals: (hospitals: HospitalInfo[]) => void;
    hospitals: HospitalInfo[];
    setHospitals: (hospitals: HospitalInfo[]) => void;
    originalFilters: FilterType;
    setOriginalFilters: (filters: FilterType) => void;
    filters: FilterType;
    setFilters: (filters: FilterType) => void;
    selectedHospital: HospitalInfo | undefined
    setSelectedHospital: (selection: HospitalInfo | undefined) => void;
    // selection: HospitalInfo | undefined;
    // setSelection: (selection: HospitalInfo | undefined) => void;
}

export const HospitalsContext = createContext<HospitalContextType>({
    originals: [],
    setOriginals: ()=>{},
    hospitals: [],
    setHospitals: ()=>{},
    originalFilters:{location:[], status:[]},
    setOriginalFilters: ()=>{},
    filters: {location:[], status:[]},
    setFilters: ()=>{},
    selectedHospital: undefined,
    setSelectedHospital: ()=>{},
    // selection: undefined,
    // setSelection: ()=>{}

})

export const HospitalsContextProvider = (props:{children: ReactNode}) => {
    const [originals, setOriginals] = useState<HospitalInfo[]>([])
    const [hospitals, setHospitals] = useState<HospitalInfo[]>([])
    const [selectedHospital, setSelectedHospital] = useState<HospitalInfo | undefined>();
    // const [selection, setSelection] = useState<HospitalInfo | undefined>();
    const [originalFilters, setOriginalFilters] = useState<FilterType>({
        location: [],
        status: [],
    })

    const [filters, setFilters] = useState<FilterType>({
        location: [],
        status: [],
    });


    useEffect(()=>{
        setHospitals(originals)
    },[originals]);

    useEffect(()=>{
        setFilters(originalFilters)
    },[originalFilters]);

    // useEffect(()=>{
    //     setSelectedHospital(selection);
    // },[selection])

    return (
        <HospitalsContext.Provider
        value={{
            hospitals, setHospitals, originals, setOriginals, filters, setFilters, originalFilters, setOriginalFilters, selectedHospital, setSelectedHospital, 
        }}
        >
            {props.children}
        </HospitalsContext.Provider>
    )
}