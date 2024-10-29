/**
 *  HospitalService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { HospitalInfo } from "../../models/hospitalInfo";
import { Hospital } from "../../models/hospital";
import { hospitalInfoService } from "../hospitalInfo/hospitalInfoService";
import { hospitalFundedService } from "../hospitalFunded/hospitalFundedService";
import { hospitalRequestService } from "../hospitalRequest/hospitalRequestService";

import { HospitalFunded } from "./../../models/hospitalFunded";
import { HospitalRequest } from "./../../models/hospitalRequest";
import { FilterType } from "../../types/fillterType";

// 클래스로 만든 이유: 함수형으로 작성하면 클로저로 상태를 유지할 수 있지만, 메서드와 속성들을 클래스로 깔끔하게 구조화한 것에 비해 관리가 어려울 수 있음.
class HospitalService {
  hospitalInfo: HospitalInfo[] = [];
  hospitalFunded: HospitalFunded[] = [];
  hospitalRequest: HospitalRequest[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    await this.initializeHospitalInfo();
    await this.initializeHospitalFunded();
    await this.initializeHospitalRequest();
  }

  private async initializeHospitalInfo() {
    this.hospitalInfo = await hospitalInfoService.getHospitalInfo();
  }
  private async initializeHospitalFunded() {
    this.hospitalFunded = await hospitalFundedService.getHospitalFunded();
  }
  private async initializeHospitalRequest() {
    this.hospitalRequest = await hospitalRequestService.getHospitalRequest();
  }

  //병원 정보, 펀딩 정보, 요청 정보를 결합하여 병원 리스트를 반환하고 필터링하는 비동기 메서드
  async combineHospitalInfoAndFundedAndRequest(
    filter?: FilterType
  ): Promise<Hospital[] | undefined> {
    await this.init();
    console.log("잘 들어오니? Hospital Info:", this.hospitalInfo);
    console.log("잘 들어오니?? Hospital Funded:", this.hospitalFunded);
    console.log("잘 들어오니??? Hospital Request:", this.hospitalRequest);
    if (
      this.hospitalInfo.length === 0 ||
      this.hospitalFunded.length === 0 ||
      this.hospitalRequest.length === 0
    ) {
      return undefined;
    } else {
      const _hospitals = this.hospitalInfo.map((hi) => {
        const hospital: Hospital = {
          hospitalInfoRecordId: "",
          requestRecordId: undefined,
          name: "",
          status: "active",
          type: "",
          description: "",
          year: 0,
          country: "",
          state: "",
          zip: "",
          city: "",
          address: "",
          longitude: 0,
          latitude: 0,
          hospitalPictures: [],
          fundingDeadline: undefined,
          requested: undefined,
          fundingCompleted: undefined,
          id: "",
        };
        hospital.hospitalInfoRecordId = hi.recordId;
        hospital.name = hi.name;
        hospital.status = hi.status;
        hospital.type = hi.type;
        hospital.description = hi.description;
        hospital.year = hi.year;
        hospital.country = hi.country;
        hospital.state = hi.state;
        hospital.zip = hi.zip;
        hospital.city = hi.city;
        hospital.address = hi.address;
        hospital.longitude = hi.longitude;
        hospital.latitude = hi.latitude;
        hospital.hospitalPictures = hi.hospitalPictures;
        hospital.id = hi.id;

        const matchedRequest = this.hospitalRequest.find(
          (hr) => hr.name[0] === hi.recordId
        );
        if (matchedRequest) {
          hospital.requestRecordId = matchedRequest.recordId;
          hospital.requested = matchedRequest.requested;
          hospital.fundingDeadline = matchedRequest.fundingDeadline;
        }
        return hospital;
      });

      const hospitals = _hospitals.map((h) => {
        const matchedFund = this.hospitalFunded.find(
          (hf) => hf.hospitalRequestId === h.requestRecordId
        );
        if (matchedFund) {
          h.fundingCompleted = matchedFund.fundingCompleted;
        }
        return h;
      });

      if (filter) {
        console.log(filter);
        const filtered_hospitals = hospitals.filter(
          (hospital) =>
            (filter.location.includes(hospital.state?.toLowerCase()) ||
              filter.location.includes(hospital.city.toLowerCase()) ||
              filter.location.includes(hospital.zip.toLowerCase())) &&
            filter.status.includes(hospital.status.toLowerCase())
        );
        return filtered_hospitals;
      } else {
        return hospitals;
      }
    }
  }

  isHospitalOpen = (hospital: Hospital | undefined) => {
    if (!hospital) {
      throw new Error("hospitalInfo is undefined");
    } else {
      return hospital.status !== "past";
    }
  };

  filterHospitals = (hospitals: Hospital[] | undefined, searchTerm: string) => {
    return hospitals?.filter(
      (h: Hospital) =>
        h.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };
}

const hospitalService = new HospitalService(); //싱글톤 인스턴스

export { hospitalService, HospitalService }; //싱글톤 인스턴스를 기본적으로 사용할 수 있게 하고, 필요에 따라 클래스도 직접 사용할 수 있는 유연성을 제공
