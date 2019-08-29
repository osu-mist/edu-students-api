1. `GET /students/{osuId}/class-schedule`

    ```json
    {
      "links": {
        "self": "string"
      },
      "data": [
        {
          "id": "931123456-201901-123456",
          "type": "class-schedule",
          "relationships": {
            "offeringAssociation": {
              "links": {
                "related": "https://api.v1.oregonstate.edu/v1/education/offeringAssociations/123"
              },
              "data": {
                "type": "offeringAssociation",
                "id": "string"
              }
            }
          },
          "attributes": {
            "academicYear": "1819",
            "academicYearDescription": "Academic Year 2018-19",
            "courseReferenceNumber": "123456",
            "courseSubject": "ECON",
            "courseSubjectDescription": "Economics",
            "courseNumber": "352",
            "courseTitle": "Environmental Economics & Policy",
            "sectionNumber": "001",
            "term": "201901",
            "termDescription": "Fall 2018",
            "scheduleDescription": "Lecture",
            "scheduleType": "A",
            "creditHours": 3,
            "registrationStatus": "Web Registered",
            "gradingMode": "Normal Grading Mode",
            "continuingEducation": true,
            "faculty": [
              {
                "osuId": "937654321",
                "name": "Johnson, Bob",
                "email": "bob.johnson@oregonstate.edu",
                "primary": true
              }
            ],
            "meetingTimes": [
              {
                "beginDate": "2018-09-20",
                "beginTime": "14:00:00",
                "endDate": "2018-11-30",
                "endTime": "14:50:00",
                "room": "100",
                "building": "LINC",
                "buildingDescription": "Learning Innovation Center",
                "campus": "Oregon State - Corvallis",
                "hoursPerWeek": 1.66,
                "creditHourSession": 2,
                "scheduleType": "A",
                "scheduleDescription": "Lecture",
                "weeklySchedule": [
                  "M",
                  "W",
                  "F"
                ]
              }
            ]
          },
          "links": {
            "self": "string"
          }
        }
      ],
      "included": [
        {}
      ]
    }
    ```

2. `GET /students/{osuId}/class-schedule?include=offeringAssociation`

    ```json
    {
      "links": {
        "self": "string"
      },
      "data": [
        {
          "id": "931123456-201901-123456",
          "type": "class-schedule",
          "relationships": {
            "offeringAssociation": {
              "links": {
                "related": "https://api.v1.oregonstate.edu/v1/education/offeringAssociations/123"
              },
              "data": {
                "type": "offeringAssociation",
                "id": "string"
              }
            }
          },
          "attributes": {
            "academicYear": "1819",
            "academicYearDescription": "Academic Year 2018-19",
            "courseReferenceNumber": "123456",
            "courseSubject": "ECON",
            "courseSubjectDescription": "Economics",
            "courseNumber": "352",
            "courseTitle": "Environmental Economics & Policy",
            "sectionNumber": "001",
            "term": "201901",
            "termDescription": "Fall 2018",
            "scheduleDescription": "Lecture",
            "scheduleType": "A",
            "creditHours": 3,
            "registrationStatus": "Web Registered",
            "gradingMode": "Normal Grading Mode",
            "continuingEducation": true,
            "faculty": [
              {
                "osuId": "937654321",
                "name": "Johnson, Bob",
                "email": "bob.johnson@oregonstate.edu",
                "primary": true
              }
            ],
            "meetingTimes": [
              {
                "beginDate": "2018-09-20",
                "beginTime": "14:00:00",
                "endDate": "2018-11-30",
                "endTime": "14:50:00",
                "room": "100",
                "building": "LINC",
                "buildingDescription": "Learning Innovation Center",
                "campus": "Oregon State - Corvallis",
                "hoursPerWeek": 1.66,
                "creditHourSession": 2,
                "scheduleType": "A",
                "scheduleDescription": "Lecture",
                "weeklySchedule": [
                  "M",
                  "W",
                  "F"
                ]
              }
            ]
          },
          "links": {
            "self": "string"
          }
        }
      ],
      "included": [
        {
          "type": "offeringAssociation",
          "id": "string",
          "meta": {
            "additionalProp1": {}
          },
          "relationships": {
            "educationOffering": {
              "links": {
                "related": "{host}{basePath}/educationOfferings/{id}"
              },
              "data": {
                "type": "educationOffering",
                "id": "string"
              }
            }
          },
          "attributes": {
            "status": "active",
            "dateLastModified": "2019-08-29T16:49:09.310Z",
            "personId": {
              "href": "string",
              "sourcedId": "string",
              "type": "academicSession"
            },
            "role": "administrator",
            "beginDate": "2019-08-29T16:49:09.310Z",
            "endDate": "2019-08-29T16:49:09.310Z",
            "associationType": "enrollment"
          }
        }
      ]
    }
    ```

3. `GET /students/{osuId}/class-schedule?include=offeringAssociation.educationOffering.education`

    ```json
    {
      "links": {
        "self": "string"
      },
      "data": [
        {
          "id": "931123456-201901-123456",
          "type": "class-schedule",
          "relationships": {
            "offeringAssociation": {
              "links": {
                "related": "https://api.v1.oregonstate.edu/v1/education/offeringAssociations/123"
              },
              "data": {
                "type": "offeringAssociation",
                "id": "string"
              }
            }
          },
          "attributes": {
            "academicYear": "1819",
            "academicYearDescription": "Academic Year 2018-19",
            "courseReferenceNumber": "123456",
            "courseSubject": "ECON",
            "courseSubjectDescription": "Economics",
            "courseNumber": "352",
            "courseTitle": "Environmental Economics & Policy",
            "sectionNumber": "001",
            "term": "201901",
            "termDescription": "Fall 2018",
            "scheduleDescription": "Lecture",
            "scheduleType": "A",
            "creditHours": 3,
            "registrationStatus": "Web Registered",
            "gradingMode": "Normal Grading Mode",
            "continuingEducation": true,
            "faculty": [
              {
                "osuId": "937654321",
                "name": "Johnson, Bob",
                "email": "bob.johnson@oregonstate.edu",
                "primary": true
              }
            ],
            "meetingTimes": [
              {
                "beginDate": "2018-09-20",
                "beginTime": "14:00:00",
                "endDate": "2018-11-30",
                "endTime": "14:50:00",
                "room": "100",
                "building": "LINC",
                "buildingDescription": "Learning Innovation Center",
                "campus": "Oregon State - Corvallis",
                "hoursPerWeek": 1.66,
                "creditHourSession": 2,
                "scheduleType": "A",
                "scheduleDescription": "Lecture",
                "weeklySchedule": [
                  "M",
                  "W",
                  "F"
                ]
              }
            ]
          },
          "links": {
            "self": "string"
          }
        }
      ],
      "included": [
        {
          "type": "offeringAssociation",
          "id": "string",
          "meta": {
            "additionalProp1": {}
          },
          "relationships": {
            "educationOffering": {
              "links": {
                "related": "{host}{basePath}/educationOfferings/{id}"
              },
              "data": {
                "type": "educationOffering",
                "id": "string"
              }
            }
          },
          "attributes": {
            "status": "active",
            "dateLastModified": "2019-08-29T17:36:27.194Z",
            "personId": {
              "href": "string",
              "sourcedId": "string",
              "type": "academicSession"
            },
            "role": "administrator",
            "beginDate": "2019-08-29T17:36:27.194Z",
            "endDate": "2019-08-29T17:36:27.194Z",
            "associationType": "enrollment"
          }
        },
        {
          "type": "educationOffering",
          "id": "string",
          "meta": {
            "additionalProp1": {}
          },
          "relationships": {
            "education": {
              "links": {
                "related": "{host}{basePath}/educations/{id}"
              },
              "data": {
                "type": "education",
                "id": "string"
              }
            }
          },
          "attributes": {
            "status": "active",
            "dateLastModified": "2019-08-29T17:37:14.996Z",
            "title": "string",
            "offeringCode": "string",
            "location": [
              {
                "href": "string",
                "sourcedId": "string",
                "type": "academicSession"
              }
            ],
            "org": {
              "href": "string",
              "sourcedId": "string",
              "type": "academicSession"
            },
            "academicSession": {
              "href": "string",
              "sourcedId": "string",
              "type": "academicSession"
            },
            "registrationStatus": "open",
            "startDate": "2019-08-29T17:37:14.996Z",
            "endDate": "2019-08-29T17:37:14.996Z",
            "offeringFormat": "online"
          }
        },
        {
          "type": "education",
          "id": "string",
          "meta": {
            "additionalProp1": {}
          },
          "attributes": {
            "status": "active",
            "dateLastModified": "2019-08-29T16:51:28.365Z",
            "title": "string",
            "code": "string",
            "organization": {
              "href": "string",
              "sourcedId": "string",
              "type": "academicSession"
            },
            "level": "graduate",
            "meetings": [
              {
                "format": "string",
                "startDate": "2019-08-29T16:51:28.365Z",
                "endDate": "2019-08-29T16:51:28.365Z"
              }
            ],
            "creditType": "credit",
            "description": "string",
            "courseType": "string",
            "educationType": "string",
            "gradingScheme": "string"
          }
        }
      ]
    }
    ```

4. `GET /students/{id}?include=degrees,class-schedule`

    ```json
    {
      "links": {
        "self": "string"
      },
      "data": {
        "type": "student",
        "id": "931234567",
        "relationships": {
          "academic-statuses": {
            "links": {
              "related": "string"
            }
          },
          "account-balance": {
            "links": {
              "related": "string"
            }
          },
          "account-transactions": {
            "links": {
              "related": "string"
            }
          },
          "classification": {
            "links": {
              "related": "string"
            }
          },
          "class-schedules": {
            "data": [
              {
                "type": "class-schedule",
                "id": "931123456-201901-123456"
              }
            ],
            "links": {
              "related": "string"
            }
          },
          "degrees": {
            "data": [
              {
                "type": "degree",
                "id": "931123456-201901-1"
              },
              {
                "type": "degree",
                "id": "931123456-201901-2"
              }
            ],
            "links": {
              "related": "string"
            }
          },
          "dual-enrollments": {
            "links": {
              "related": "string"
            }
          },
          "gpa": {
            "links": {
              "related": "string"
            }
          },
          "grades": {
            "links": {
              "related": "string"
            }
          },
          "holds": {
            "links": {
              "related": "string"
            }
          },
          "work-study": {
            "links": {
              "related": "string"
            }
          }
        }
      },
      "included": [
        {
          "id": "931123456-201901-123456",
          "type": "class-schedule",
          "relationships": {
            "offeringAssociation": {
              "links": {
                "related": "{host}{basePath}/offeringAssociations/{id}"
              },
              "data": {
                "type": "offeringAssociation",
                "id": "string"
              }
            }
          },
          "attributes": {
            "academicYear": "1819",
            "academicYearDescription": "Academic Year 2018-19",
            "courseReferenceNumber": "123456",
            "courseSubject": "ECON",
            "courseSubjectDescription": "Economics",
            "courseNumber": "352",
            "courseTitle": "Environmental Economics & Policy",
            "sectionNumber": "001",
            "term": "201901",
            "termDescription": "Fall 2018",
            "scheduleDescription": "Lecture",
            "scheduleType": "A",
            "creditHours": 3,
            "registrationStatus": "Web Registered",
            "gradingMode": "Normal Grading Mode",
            "continuingEducation": true,
            "faculty": [
              {
                "osuId": "937654321",
                "name": "Johnson, Bob",
                "email": "bob.johnson@oregonstate.edu",
                "primary": true
              }
            ],
            "meetingTimes": [
              {
                "beginDate": "2018-09-20",
                "beginTime": "14:00:00",
                "endDate": "2018-11-30",
                "endTime": "14:50:00",
                "room": "100",
                "building": "LINC",
                "buildingDescription": "Learning Innovation Center",
                "campus": "Oregon State - Corvallis",
                "hoursPerWeek": 1.66,
                "creditHourSession": 2,
                "scheduleType": "A",
                "scheduleDescription": "Lecture",
                "weeklySchedule": [
                  "M",
                  "W",
                  "F"
                ]
              }
            ]
          },
          "links": {
            "self": "string"
          }
        },
        {
          "id": "931123456-201901-1",
          "type": "degree",
          "attributes": {
            "term": "201901",
            "termDescription": "Fall 2018",
            "academicYear": "1819",
            "academicYearDescription": "Academic Year 2018-19",
            "programNumber": 1,
            "primaryDegree": true,
            "degree": "Bachelor of Science",
            "level": "Undergraduate",
            "college": "College of Liberal Arts",
            "degreeAwardCategory": "Baccalaureate Degree",
            "majors": {
              "first": {
                "major": "Business Administration",
                "programClassification": "Business Admin & Mgmt, General",
                "department": "Business Administration",
                "firstConcentration": "Accounting",
                "secondConcentration": "Finance",
                "thirdConcentration": "International Business"
              },
              "second": {
                "major": "Business Administration",
                "programClassification": "Business Admin & Mgmt, General",
                "department": "Business Administration",
                "firstConcentration": "Accounting",
                "secondConcentration": "Finance",
                "thirdConcentration": "International Business"
              },
              "third": {
                "major": "Business Administration",
                "programClassification": "Business Admin & Mgmt, General",
                "department": "Business Administration",
                "firstConcentration": "Accounting",
                "secondConcentration": "Finance",
                "thirdConcentration": "International Business"
              },
              "fourth": {
                "major": "Business Administration",
                "programClassification": "Business Admin & Mgmt, General",
                "department": "Business Administration",
                "firstConcentration": "Accounting",
                "secondConcentration": "Finance",
                "thirdConcentration": "International Business"
              }
            },
            "minors": {
              "first": {
                "minor": "History"
              },
              "second": {
                "minor": "History"
              },
              "third": {
                "minor": "History"
              },
              "fourth": {
                "minor": "History"
              }
            }
          }
        },
        {
          "id": "931123456-201901-2",
          "type": "degree",
          "attributes": {
            "term": "201901",
            "termDescription": "Fall 2018",
            "academicYear": "1819",
            "academicYearDescription": "Academic Year 2018-19",
            "programNumber": 2,
            "primaryDegree": true,
            "degree": "Bachelor of Science",
            "level": "Undergraduate",
            "college": "College of Liberal Arts",
            "degreeAwardCategory": "Baccalaureate Degree",
            "majors": {
              "first": {
                "major": "Business Administration",
                "programClassification": "Business Admin & Mgmt, General",
                "department": "Business Administration",
                "firstConcentration": "Accounting",
                "secondConcentration": "Finance",
                "thirdConcentration": "International Business"
              },
              "second": {
                "major": "Business Administration",
                "programClassification": "Business Admin & Mgmt, General",
                "department": "Business Administration",
                "firstConcentration": "Accounting",
                "secondConcentration": "Finance",
                "thirdConcentration": "International Business"
              },
              "third": {
                "major": "Business Administration",
                "programClassification": "Business Admin & Mgmt, General",
                "department": "Business Administration",
                "firstConcentration": "Accounting",
                "secondConcentration": "Finance",
                "thirdConcentration": "International Business"
              },
              "fourth": {
                "major": "Business Administration",
                "programClassification": "Business Admin & Mgmt, General",
                "department": "Business Administration",
                "firstConcentration": "Accounting",
                "secondConcentration": "Finance",
                "thirdConcentration": "International Business"
              }
            },
            "minors": {
              "first": {
                "minor": "History"
              },
              "second": {
                "minor": "History"
              },
              "third": {
                "minor": "History"
              },
              "fourth": {
                "minor": "History"
              }
            }
          }
        }
      ]
    }
    ```
