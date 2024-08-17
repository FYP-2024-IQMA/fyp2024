export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          age: Database["public"]["Enums"]["age_type"]
          datecreated: string | null
          email: string
          firstname: string
          gender: Database["public"]["Enums"]["gender_type"]
          lastname: string
          role: Database["public"]["Enums"]["role"]
          userid: string
        }
        Insert: {
          age: Database["public"]["Enums"]["age_type"]
          datecreated?: string | null
          email: string
          firstname: string
          gender: Database["public"]["Enums"]["gender_type"]
          lastname: string
          role: Database["public"]["Enums"]["role"]
          userid: string
        }
        Update: {
          age?: Database["public"]["Enums"]["age_type"]
          datecreated?: string | null
          email?: string
          firstname?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          lastname?: string
          role?: Database["public"]["Enums"]["role"]
          userid?: string
        }
        Relationships: []
      }
      accountsaffective: {
        Row: {
          attitude: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationallevel: Database["public"]["Enums"]["motivational_level_type"]
          personality: Database["public"]["Enums"]["personality_type"]
          reasons: Database["public"]["Enums"]["reasons_for_attending_section_type"][]
          userid: string
        }
        Insert: {
          attitude: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationallevel: Database["public"]["Enums"]["motivational_level_type"]
          personality: Database["public"]["Enums"]["personality_type"]
          reasons: Database["public"]["Enums"]["reasons_for_attending_section_type"][]
          userid: string
        }
        Update: {
          attitude?: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers?: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationallevel?: Database["public"]["Enums"]["motivational_level_type"]
          personality?: Database["public"]["Enums"]["personality_type"]
          reasons?: Database["public"]["Enums"]["reasons_for_attending_section_type"][]
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountsaffective_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      accountscognitive: {
        Row: {
          educationallevel: Database["public"]["Enums"]["educational_level_type"]
          languageabilities: Database["public"]["Enums"]["language_abilities_type"]
          learningpreferences: Database["public"]["Enums"]["learning_preferences_type"]
          litnumproficiency: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorknowledge: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userid: string
        }
        Insert: {
          educationallevel: Database["public"]["Enums"]["educational_level_type"]
          languageabilities: Database["public"]["Enums"]["language_abilities_type"]
          learningpreferences: Database["public"]["Enums"]["learning_preferences_type"]
          litnumproficiency: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorknowledge: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userid: string
        }
        Update: {
          educationallevel?: Database["public"]["Enums"]["educational_level_type"]
          languageabilities?: Database["public"]["Enums"]["language_abilities_type"]
          learningpreferences?: Database["public"]["Enums"]["learning_preferences_type"]
          litnumproficiency?: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorknowledge?: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountscognitive_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      accountsdemographics: {
        Row: {
          careerstage: Database["public"]["Enums"]["career_stage_type"]
          ethnicgroup: string
          jobcategory: Database["public"]["Enums"]["job_category_type"]
          lifestage: Database["public"]["Enums"]["life_stage_type"]
          race: Database["public"]["Enums"]["race_type"]
          specialneeds: Database["public"]["Enums"]["special_needs_type"]
          userid: string
        }
        Insert: {
          careerstage: Database["public"]["Enums"]["career_stage_type"]
          ethnicgroup: string
          jobcategory: Database["public"]["Enums"]["job_category_type"]
          lifestage: Database["public"]["Enums"]["life_stage_type"]
          race: Database["public"]["Enums"]["race_type"]
          specialneeds: Database["public"]["Enums"]["special_needs_type"]
          userid: string
        }
        Update: {
          careerstage?: Database["public"]["Enums"]["career_stage_type"]
          ethnicgroup?: string
          jobcategory?: Database["public"]["Enums"]["job_category_type"]
          lifestage?: Database["public"]["Enums"]["life_stage_type"]
          race?: Database["public"]["Enums"]["race_type"]
          specialneeds?: Database["public"]["Enums"]["special_needs_type"]
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountsdemographics_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      accountssocial: {
        Row: {
          compliteracy: Database["public"]["Enums"]["computer_literacy_type"]
          relationshiptopeers: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialbackground: Database["public"]["Enums"]["social_background_type"]
          tendency: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userid: string
        }
        Insert: {
          compliteracy: Database["public"]["Enums"]["computer_literacy_type"]
          relationshiptopeers: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialbackground: Database["public"]["Enums"]["social_background_type"]
          tendency: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userid: string
        }
        Update: {
          compliteracy?: Database["public"]["Enums"]["computer_literacy_type"]
          relationshiptopeers?: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialbackground?: Database["public"]["Enums"]["social_background_type"]
          tendency?: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountssocial_userid_fkey"
            columns: ["userid"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      certificate: {
        Row: {
          certificateid: number
          certificateurl: string | null
          issuedate: string | null
          provider: string
          sectionid: string
          userid: string
        }
        Insert: {
          certificateid?: number
          certificateurl?: string | null
          issuedate?: string | null
          provider: string
          sectionid: string
          userid: string
        }
        Update: {
          certificateid?: number
          certificateurl?: string | null
          issuedate?: string | null
          provider?: string
          sectionid?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificate_sectionid_fkey"
            columns: ["sectionid"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionid"]
          },
          {
            foreignKeyName: "certificate_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      chat: {
        Row: {
          chattext: string
          datecreated: string
          role: Database["public"]["Enums"]["chat_role"]
          sectionid: string
          userid: string
        }
        Insert: {
          chattext: string
          datecreated?: string
          role: Database["public"]["Enums"]["chat_role"]
          sectionid: string
          userid: string
        }
        Update: {
          chattext?: string
          datecreated?: string
          role?: Database["public"]["Enums"]["chat_role"]
          sectionid?: string
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sectionid_fkey"
            columns: ["sectionid"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionid"]
          },
          {
            foreignKeyName: "chat_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      lesson: {
        Row: {
          datecreated: string | null
          lessoncheatsheet: string | null
          lessondescription: string | null
          lessonduration: number | null
          lessonid: string
          lessonkeytakeaway: string | null
          lessonname: string
          lessontext: string | null
          lessonurl: string | null
          sectionid: string
          unitid: string
        }
        Insert: {
          datecreated?: string | null
          lessoncheatsheet?: string | null
          lessondescription?: string | null
          lessonduration?: number | null
          lessonid: string
          lessonkeytakeaway?: string | null
          lessonname: string
          lessontext?: string | null
          lessonurl?: string | null
          sectionid: string
          unitid: string
        }
        Update: {
          datecreated?: string | null
          lessoncheatsheet?: string | null
          lessondescription?: string | null
          lessonduration?: number | null
          lessonid?: string
          lessonkeytakeaway?: string | null
          lessonname?: string
          lessontext?: string | null
          lessonurl?: string | null
          sectionid?: string
          unitid?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_sectionid_unitid_fkey"
            columns: ["sectionid", "unitid"]
            isOneToOne: false
            referencedRelation: "unit"
            referencedColumns: ["sectionid", "unitid"]
          },
        ]
      }
      question: {
        Row: {
          answer: string | null
          isselfreflection: boolean
          option1: Json | null
          option2: Json | null
          option3: Json | null
          option4: Json | null
          question: string
          questionno: number
          quizid: number
        }
        Insert: {
          answer?: string | null
          isselfreflection: boolean
          option1?: Json | null
          option2?: Json | null
          option3?: Json | null
          option4?: Json | null
          question: string
          questionno: number
          quizid: number
        }
        Update: {
          answer?: string | null
          isselfreflection?: boolean
          option1?: Json | null
          option2?: Json | null
          option3?: Json | null
          option4?: Json | null
          question?: string
          questionno?: number
          quizid?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_quizid_fkey"
            columns: ["quizid"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quizid"]
          },
        ]
      }
      quiz: {
        Row: {
          lastupdated: string | null
          lessonid: string | null
          quizid: number
          quiztype: Database["public"]["Enums"]["quiz_type"]
          sectionid: string
          unitid: string | null
        }
        Insert: {
          lastupdated?: string | null
          lessonid?: string | null
          quizid?: number
          quiztype: Database["public"]["Enums"]["quiz_type"]
          sectionid: string
          unitid?: string | null
        }
        Update: {
          lastupdated?: string | null
          lessonid?: string | null
          quizid?: number
          quiztype?: Database["public"]["Enums"]["quiz_type"]
          sectionid?: string
          unitid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_sectionid_fkey"
            columns: ["sectionid"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionid"]
          },
          {
            foreignKeyName: "quiz_sectionid_unitid_fkey"
            columns: ["sectionid", "unitid"]
            isOneToOne: false
            referencedRelation: "unit"
            referencedColumns: ["sectionid", "unitid"]
          },
          {
            foreignKeyName: "quiz_sectionid_unitid_lessonid_fkey"
            columns: ["sectionid", "unitid", "lessonid"]
            isOneToOne: false
            referencedRelation: "lesson"
            referencedColumns: ["sectionid", "unitid", "lessonid"]
          },
        ]
      }
      response: {
        Row: {
          questionno: number
          quizid: number
          response: string | null
          userid: string
        }
        Insert: {
          questionno: number
          quizid: number
          response?: string | null
          userid: string
        }
        Update: {
          questionno?: number
          quizid?: number
          response?: string | null
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "response_quizid_questionno_fkey"
            columns: ["quizid", "questionno"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["quizid", "questionno"]
          },
          {
            foreignKeyName: "response_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      result: {
        Row: {
          datecreated: string | null
          quizid: number
          score: number
          userid: string
        }
        Insert: {
          datecreated?: string | null
          quizid: number
          score: number
          userid: string
        }
        Update: {
          datecreated?: string | null
          quizid?: number
          score?: number
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "result_quizid_fkey"
            columns: ["quizid"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quizid"]
          },
          {
            foreignKeyName: "result_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userid"]
          },
        ]
      }
      section: {
        Row: {
          datecreated: string | null
          finalassessmentintro: string | null
          finalscenario: string | null
          introductionurl: string | null
          sectiondescription: string | null
          sectionid: string
          sectionname: string
          skillsfutureccs: string
        }
        Insert: {
          datecreated?: string | null
          finalassessmentintro?: string | null
          finalscenario?: string | null
          introductionurl?: string | null
          sectiondescription?: string | null
          sectionid: string
          sectionname: string
          skillsfutureccs: string
        }
        Update: {
          datecreated?: string | null
          finalassessmentintro?: string | null
          finalscenario?: string | null
          introductionurl?: string | null
          sectiondescription?: string | null
          sectionid?: string
          sectionname?: string
          skillsfutureccs?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_skillsfutureccs_fkey"
            columns: ["skillsfutureccs"]
            isOneToOne: false
            referencedRelation: "skillsfuturemapping"
            referencedColumns: ["skillsfutureccs"]
          },
        ]
      }
      sectionsequence: {
        Row: {
          age: Database["public"]["Enums"]["age_type"]
          sectionid: string
          sequenceno: number
        }
        Insert: {
          age: Database["public"]["Enums"]["age_type"]
          sectionid: string
          sequenceno: number
        }
        Update: {
          age?: Database["public"]["Enums"]["age_type"]
          sectionid?: string
          sequenceno?: number
        }
        Relationships: [
          {
            foreignKeyName: "sectionsequence_sectionid_fkey"
            columns: ["sectionid"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionid"]
          },
        ]
      }
      skillsfuturemapping: {
        Row: {
          cluster: string
          skillsfutureccs: string
        }
        Insert: {
          cluster: string
          skillsfutureccs: string
        }
        Update: {
          cluster?: string
          skillsfutureccs?: string
        }
        Relationships: []
      }
      unit: {
        Row: {
          assessmentintro: string | null
          datecreated: string | null
          realitycheck: string | null
          scenario: string | null
          sectionid: string
          unitdescription: string | null
          unitid: string
          unitname: string
        }
        Insert: {
          assessmentintro?: string | null
          datecreated?: string | null
          realitycheck?: string | null
          scenario?: string | null
          sectionid: string
          unitdescription?: string | null
          unitid: string
          unitname: string
        }
        Update: {
          assessmentintro?: string | null
          datecreated?: string | null
          realitycheck?: string | null
          scenario?: string | null
          sectionid?: string
          unitdescription?: string | null
          unitid?: string
          unitname?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_sectionid_fkey"
            columns: ["sectionid"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      age_type:
        | "Baby Boomers (55-75)"
        | "Generation X (40-55)"
        | "Millennials (25-40)"
        | "Generation Z (18-24)"
      attitude_towards_learning_type: "Positive" | "Neutral" | "Negative"
      barriers_to_learning_interests_type:
        | "Time"
        | "Resources"
        | "Accessibility"
        | "Interest"
      career_stage_type: "Starter" | "Builder" | "Accelerator" | "Expert"
      chat_role: "system" | "user"
      computer_literacy_type: "Advanced" | "Intermediate" | "Basic" | "None"
      educational_level_type:
        | "High school or below"
        | "Some college"
        | "Bachelor's degree"
        | "Master's degree"
        | "Doctoral degree"
      gender_type: "Male" | "Female" | "Other"
      job_category_type:
        | "Entry-level"
        | "Mid-level"
        | "Senior-level"
        | "Executive"
      language_abilities_type: "Fluent" | "Proficient" | "Basic" | "None"
      learning_preferences_type:
        | "Visual"
        | "Auditory"
        | "Kinesthetic"
        | "Reading/Writing"
      life_stage_type:
        | "Early career"
        | "Mid-career"
        | "Late career"
        | "Retirement"
      literacy_numeracy_proficiency_type:
        | "Advanced"
        | "Intermediate"
        | "Basic"
        | "None"
      motivational_level_type: "High" | "Medium" | "Low"
      personality_type: "Extroverted" | "Introverted" | "Ambivert"
      prior_knowledge_skills_type:
        | "Advanced"
        | "Intermediate"
        | "Basic"
        | "None"
      quiz_type: "section" | "unit" | "lesson"
      race_type:
        | "Caucasian"
        | "African American"
        | "Asian"
        | "Hispanic/Latino"
        | "Other"
      reasons_for_attending_course_type:
        | "Career advancement"
        | "Skill development"
        | "Personal interest"
        | "Requirement"
      reasons_for_attending_section_type:
        | "Career advancement"
        | "Skill development"
        | "Personal interest"
        | "Requirement"
      relationship_to_peers_type:
        | "Collaborative"
        | "Competitive"
        | "Supportive"
        | "Independent"
      role: "admin" | "learner"
      social_background_type: "Urban" | "Suburban" | "Rural"
      special_needs_type: "None" | "Physical" | "Mental" | "Other"
      tendency_to_compete_or_cooperate_type:
        | "Competitive"
        | "Cooperative"
        | "Both"
        | "Neither"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
