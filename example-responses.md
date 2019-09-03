# Example Responses

This file contains some example responses for the EDU Students API adapted to fit the
[JSON:API](https://jsonapi.org/format/) specification.

## Examples

1.  A request to get the class schedules for a student without requesting any additional information.

    The `relationships` objects only include a link which can be used to fetch the related
    resources. `id` and `type` are not included so the API won't need to fetch related resource
    information. This reduces the work required by the API.

    `GET /students/{osuId}/class-schedule`

    ```json
    {
      "links": {
        "self": "https://api.v1.oregonstate.edu/v1/students/{osuId}/class-schedule"
      },
      "data": [
        {
          "id": "931123456-201901-123456",
          "type": "class-schedule",
          "relationships": {
            "offeringAssociation": {
              "links": {
                "related":
                "https://api.v1.oregonstate.edu/v1/education/offeringAssociations?filter[personId]=931123456"
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
          }
        }
      ]
    }
    ```

2.  A request to get the class schedules for a student along with the offering associations for each
    class schedule.

    This is a JSON:API compound document. All related resources included in the response will
    appear in a flat, top-level array keyed by `included`. Due to JSON:API's "full linkage"
    requirement with compound documents, all included resources must have their `type` and `id`
    appear under another resource's `relationships` somewhere else in the response. So the class
    schedule's `relationships` will list all `type` and `id` pairs.

    `GET /students/{osuId}/class-schedule?include=offeringAssociation`

    ```json
    {
      "links": {
        "self": "https://api.v1.oregonstate.edu/v1/students/{osuId}/class-schedule"
      },
      "data": [
        {
          "id": "931123456-201901-123456",
          "type": "class-schedule",
          "relationships": {
            "offeringAssociation": {
              "links": {
                "related": "https://api.v1.oregonstate.edu/v1/education/offeringAssociations?filter[personId]=931123456"
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
          }
        }
      ],
      "included": [
        {
          "type": "offeringAssociation",
          "id": "123",
          "meta": {
            "additionalProp1": {}
          },
          "relationships": {
            "educationOffering": {
              "links": {
                "related": "https://api.v1.oregonstate.edu/v1/education/offeringAssociations/123"
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

3.  A request to get:

    1. the class schedules for a student
    2. the offering associations for each class schedule
    3. the education offerings for each offering association
    4. the educations for each education offering.

    This slightly more complex example shows how multiple, nested related resources can be included
    in a single response. Each relationship name in `include` can be dot-separated to specify these
    nested relationships. Again, due to JSON:API's "full linkage" requirement, all included resources
    must be specified by some other resource in the response. In this context, this means that when a
    nested related resource is included, all intermediate related resources also must be included. So
    when `offeringAssociation.educationOffering.education` is specified, `offeringAssociation` and
    `offeringAssociation.educationOffering` are indirectly specified as well.

    _Note: JSON:API allows for giving nested relationships different names if there is a need to
    include them without intermediate resources._

    `GET /students/{osuId}/class-schedule?include=offeringAssociation.educationOffering.education`

    ```json
    {
      "links": {
        "self": "https://api.v1.oregonstate.edu/v1/students/{osuId}/class-schedule"
      },
      "data": [
        {
          "id": "931123456-201901-123456",
          "type": "class-schedule",
          "relationships": {
            "offeringAssociation": {
              "links": {
                "related": "https://api.v1.oregonstate.edu/v1/education/offeringAssociations?filter[personId]=931123456"
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
                "related": "https://api.v1.oregonstate.edu/v1/education/offeringAssociations/123"
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
                "related": "https://api.v1.oregonstate.edu/v1/education/educations/456"
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

4.  A request to get a student resource along with their associated degrees and class-schedules

    This is an example of a student resource with many related resources. Using JSON:API compound
    documents allows the client to selectively fetch data for a student with a single request. The
    response also only includes relevant data. In this case, the number of requests to get all
    student information is reduced from 11 to 1. JSON:API's "full linkage" requirement also ensures
    that included resources can be parsed in a programmatical way, even if the `included` array
    becomes large.

    `GET /students/{id}?include=degrees,class-schedule`

    ```json
    {
      "links": {
        "self": "https://api.v1.oregonstate.edu/v1/students/931234567"
      },
      "data": {
        "type": "student",
        "id": "931234567",
        "relationships": {
          "academic-statuses": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/academic-statuses"
            }
          },
          "account-balance": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/account-balance"
            }
          },
          "account-transactions": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/account-transactions"
            }
          },
          "classification": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/classification"
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
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/class-schedule"
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
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/degrees"
            }
          },
          "dual-enrollments": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/dual-enrollments"
            }
          },
          "gpa": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/gpa"
            }
          },
          "grades": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/grades"
            }
          },
          "holds": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/holds"
            }
          },
          "work-study": {
            "links": {
              "related": "https://api.v1.oregonstate.edu/v1/students/931234567/work-study"
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
                "related": "https://api.v1.oregonstate.edu/v1/education/offeringAssociations?filter[personId]=931123456"
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
