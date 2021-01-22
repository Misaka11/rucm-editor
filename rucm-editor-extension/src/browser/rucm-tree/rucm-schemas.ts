/*!
 * Copyright (C) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 */
export const actorView = {
  "type": "VerticalLayout",
  "elements": [
    {
      'type': 'Label',
      'text': 'Actor'
    },
    {
      "type": "Control",
      "label": "name",
      "scope": "#/properties/name"
    },
    {
      "type": "Control",
      "label": "description",
      "scope": "#/properties/description"
    }
  ]
}
export const ucmodelView = {
  "type": "VerticalLayout",
  "elements": [
    {
      'type': 'Label',
      'text': 'UCModel'
    },
    {
      "type": "Control",
      "label": "name",
      "scope": "#/properties/name"
    },
    {
      "type": "Control",
      "label": "description",
      "scope": "#/properties/description"
    },
  ]
}
export const packageView = {
  "type": "VerticalLayout",
  "elements": [
    {
      'type': 'Label',
      'text': 'Package'
    },
    {
      "type": "Control",
      "label": "name",
      "scope": "#/properties/name"
    },
    {
      "type": "Control",
      "label": "description",
      "scope": "#/properties/description"
    }
  ]
}
export const usecaseView = {
  "type": "VerticalLayout",
  "elements": [
    {
      'type': 'Label',
      'text': 'UseCase'
    },
    {
      "type": "Group",
      "elements": [
        {
          "type": "Label",
          "text": "Use Case Specification"
        }
      ]
    },
    {
      "type": "Group",
      "elements": [
        {
          "type": "Control",
          "label": "name",
          "scope": "#/properties/specification/properties/name"
        },
        {
          "type": "Control",
          "label": "briefDescription",
          "scope": "#/properties/specification/properties/briefDescription"
        },
        {
          "type": "Control",
          "label": "preCondition",
          "scope": "#/properties/specification/properties/preCondition"
        },
        {
          "type": "Control",
          "label": "primaryActor",
          "scope": "#/properties/specification/properties/primaryActor"
        },
        {
          "type": "Control",
          "label": "secondaryActors",
          "scope": "#/properties/specification/properties/secondaryActors"
        }
      ]
    },
    {
      "type": "Group",
      "elements": [
        {
          "type": "Control",
          "label": "basicFlow",
          "scope": "#/properties/specification/properties/basicFlow"
        },
        {
          "type": "Control",
          "label": "alternativeFlows",
          "scope": "#/properties/specification/properties/alternativeFlows"
        }
      ]
    }
  ]
}
export const relationshipView = {
  "type": "VerticalLayout",
  "elements": [
    {
      'type': 'Label',
      'text': 'Relationship'
    },
    {
      "type": "Control",
      "label": "name",
      "scope": "#/properties/name"
    },
    {
      "type": "Control",
      "label": "description",
      "scope": "#/properties/description"
    }
  ]
}
export const generalizationView = {
  "type": "VerticalLayout",
  "elements": [
    {
      'type': 'Label',
      'text': 'Generalization'
    },
    {
      "type": "Control",
      "label": "name",
      "scope": "#/properties/name"
    },
    {
      "type": "Control",
      "label": "description",
      "scope": "#/properties/description"
    }
  ]
}

/************************************/
export const coffeeSchema = {
  'definitions': {
    'package':{
      '$id': '#package',
      'title': 'Package',
      "type": "object",
      "properties": {
        'eClass': {
          'const': 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//Package'
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "modelElements": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            },
            "additionalProperties": false
          }
        }
      },
      "additionalProperties": false
    },
    'ucmodel':{
      '$id': '#ucmodel',
      'title': 'UCModel',
      "type": "object",
      "properties": {
        'eClass': {
          'const': 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//UCModel'
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "modelElements": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            },
            "additionalProperties": false
          }
        },
        "diagrams": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "left": {
                "type": "integer"
              },
              "top": {
                "type": "integer"
              },
              "width": {
                "type": "integer"
              },
              "height": {
                "type": "integer"
              },
              "nodes": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "left": {
                      "type": "integer"
                    },
                    "top": {
                      "type": "integer"
                    },
                    "width": {
                      "type": "integer"
                    },
                    "height": {
                      "type": "integer"
                    }
                  },
                  "additionalProperties": false
                }
              },
              "name": {
                "type": "string"
              },
              "links": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {},
                  "additionalProperties": false
                }
              }
            },
            "additionalProperties": false
          }
        }
      },
      "additionalProperties": false
    },
    'actor':{
      '$id': '#actor',
      'title': 'Actor',
      "type": "object",
      "properties": {
        'eClass': {
          'const': 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//Actor'
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    'relationship':{
      '$id': '#relationship',
      'title': 'Relationship',
      "type": "object",
      "properties": {
        'eClass': {
          'const': 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//Relationship'
        },
      },
      "additionalProperties": false
    },
    'generalization':{
      '$id': '#generalization',
      'title': 'Generalization',
      "type": "object",
      "properties": {
        'eClass': {
          'const': 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//Generalization'
        },
        
      },
      "additionalProperties": false
    },
    'usecase':{
      '$id': '#usecase',
      'title': 'Usecase',
      "type": "object",
      "properties": {
        'eClass': {
          'const': 'http://simplexity.nuaa.edu.cn/ucmeta/1.3.0/#//UseCase'
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "include": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              }
            },
            "additionalProperties": false
          }
        },
        "extend": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "extensionLocation": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                }
              },
              "condition": {
                "type": "string"
              }
            },
            "additionalProperties": false
          }
        },
        "specification": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "primaryActor": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                }
              },
              "additionalProperties": false
            },
            "preCondition": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "sentences": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "content": {
                        "type": "string"
                      },
                      "natures": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {},
                          "additionalProperties": false
                        }
                      }
                    },
                    "additionalProperties": false
                  }
                }
              },
              "additionalProperties": false
            },
            "briefDescription": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                }
              },
              "additionalProperties": false
            },
            "basicFlow": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "postCondition": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                }
              },
              "additionalProperties": false
            },
            "alternativeFlows": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              }
            }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    }
  },
  '$ref': '#/definitions/ucmodel'
};

