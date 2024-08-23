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
          dateCreated: string | null
          email: string
          firstName: string
          gender: Database["public"]["Enums"]["gender_type"]
          hasOnboarded: boolean | null
          lastName: string
          role: Database["public"]["Enums"]["role"]
          userID: string
        }
        Insert: {
          age: Database["public"]["Enums"]["age_type"]
          dateCreated?: string | null
          email: string
          firstName: string
          gender: Database["public"]["Enums"]["gender_type"]
          hasOnboarded?: boolean | null
          lastName: string
          role: Database["public"]["Enums"]["role"]
          userID: string
        }
        Update: {
          age?: Database["public"]["Enums"]["age_type"]
          dateCreated?: string | null
          email?: string
          firstName?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          hasOnboarded?: boolean | null
          lastName?: string
          role?: Database["public"]["Enums"]["role"]
          userID?: string
        }
        Relationships: []
      }
      accountsaffective: {
        Row: {
          attitude: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationalLevel: Database["public"]["Enums"]["motivational_level_type"]
          personality: Database["public"]["Enums"]["personality_type"]
          reasons: Database["public"]["Enums"]["reasons_for_attending_section_type"][]
          userID: string
        }
        Insert: {
          attitude: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationalLevel: Database["public"]["Enums"]["motivational_level_type"]
          personality: Database["public"]["Enums"]["personality_type"]
          reasons: Database["public"]["Enums"]["reasons_for_attending_section_type"][]
          userID: string
        }
        Update: {
          attitude?: Database["public"]["Enums"]["attitude_towards_learning_type"]
          barriers?: Database["public"]["Enums"]["barriers_to_learning_interests_type"][]
          motivationalLevel?: Database["public"]["Enums"]["motivational_level_type"]
          personality?: Database["public"]["Enums"]["personality_type"]
          reasons?: Database["public"]["Enums"]["reasons_for_attending_section_type"][]
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountsaffective_userID_fkey"
            columns: ["userID"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userID"]
          },
        ]
      }
      accountscognitive: {
        Row: {
          educationalLevel: Database["public"]["Enums"]["educational_level_type"]
          languageAbilities: Database["public"]["Enums"]["language_abilities_type"]
          learningPreferences: Database["public"]["Enums"]["learning_preferences_type"]
          litNumProficiency: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorKnowledge: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userID: string
        }
        Insert: {
          educationalLevel: Database["public"]["Enums"]["educational_level_type"]
          languageAbilities: Database["public"]["Enums"]["language_abilities_type"]
          learningPreferences: Database["public"]["Enums"]["learning_preferences_type"]
          litNumProficiency: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorKnowledge: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userID: string
        }
        Update: {
          educationalLevel?: Database["public"]["Enums"]["educational_level_type"]
          languageAbilities?: Database["public"]["Enums"]["language_abilities_type"]
          learningPreferences?: Database["public"]["Enums"]["learning_preferences_type"]
          litNumProficiency?: Database["public"]["Enums"]["literacy_numeracy_proficiency_type"]
          priorKnowledge?: Database["public"]["Enums"]["prior_knowledge_skills_type"]
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountscognitive_userID_fkey"
            columns: ["userID"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userID"]
          },
        ]
      }
      accountsdemographics: {
        Row: {
          careerStage: Database["public"]["Enums"]["career_stage_type"]
          ethnicGroup: string
          jobCategory: Database["public"]["Enums"]["job_category_type"]
          lifeStage: Database["public"]["Enums"]["life_stage_type"]
          race: Database["public"]["Enums"]["race_type"]
          specialNeeds: Database["public"]["Enums"]["special_needs_type"]
          userID: string
        }
        Insert: {
          careerStage: Database["public"]["Enums"]["career_stage_type"]
          ethnicGroup: string
          jobCategory: Database["public"]["Enums"]["job_category_type"]
          lifeStage: Database["public"]["Enums"]["life_stage_type"]
          race: Database["public"]["Enums"]["race_type"]
          specialNeeds: Database["public"]["Enums"]["special_needs_type"]
          userID: string
        }
        Update: {
          careerStage?: Database["public"]["Enums"]["career_stage_type"]
          ethnicGroup?: string
          jobCategory?: Database["public"]["Enums"]["job_category_type"]
          lifeStage?: Database["public"]["Enums"]["life_stage_type"]
          race?: Database["public"]["Enums"]["race_type"]
          specialNeeds?: Database["public"]["Enums"]["special_needs_type"]
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountsdemographics_userID_fkey"
            columns: ["userID"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userID"]
          },
        ]
      }
      accountssocial: {
        Row: {
          compLiteracy: Database["public"]["Enums"]["computer_literacy_type"]
          relationshipToPeers: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialBackground: Database["public"]["Enums"]["social_background_type"]
          tendency: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userID: string
        }
        Insert: {
          compLiteracy: Database["public"]["Enums"]["computer_literacy_type"]
          relationshipToPeers: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialBackground: Database["public"]["Enums"]["social_background_type"]
          tendency: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userID: string
        }
        Update: {
          compLiteracy?: Database["public"]["Enums"]["computer_literacy_type"]
          relationshipToPeers?: Database["public"]["Enums"]["relationship_to_peers_type"]
          socialBackground?: Database["public"]["Enums"]["social_background_type"]
          tendency?: Database["public"]["Enums"]["tendency_to_compete_or_cooperate_type"]
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "accountssocial_userID_fkey"
            columns: ["userID"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["userID"]
          },
        ]
      }
      certificate: {
        Row: {
          certificateID: number
          certificateURL: string | null
          issueDate: string | null
          provider: string
          sectionID: string
          userID: string
        }
        Insert: {
          certificateID?: number
          certificateURL?: string | null
          issueDate?: string | null
          provider: string
          sectionID: string
          userID: string
        }
        Update: {
          certificateID?: number
          certificateURL?: string | null
          issueDate?: string | null
          provider?: string
          sectionID?: string
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificate_sectionID_fkey"
            columns: ["sectionID"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionID"]
          },
          {
            foreignKeyName: "certificate_userID_fkey"
            columns: ["userID"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userID"]
          },
        ]
      }
      chat: {
        Row: {
          dateCreated: string
          queryPair: Json[] | null
          sectionID: string
          userID: string
        }
        Insert: {
          dateCreated?: string
          queryPair?: Json[] | null
          sectionID: string
          userID: string
        }
        Update: {
          dateCreated?: string
          queryPair?: Json[] | null
          sectionID?: string
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sectionID_fkey"
            columns: ["sectionID"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionID"]
          },
          {
            foreignKeyName: "chat_userID_fkey"
            columns: ["userID"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userID"]
          },
        ]
      }
      lesson: {
        Row: {
          dateCreated: string | null
          lessonCheatSheet: string | null
          lessonDescription: string | null
          lessonDuration: number | null
          lessonID: string
          lessonKeyTakeaway: string | null
          lessonName: string
          lessonText: string | null
          lessonURL: string | null
          sectionID: string
          unitID: string
        }
        Insert: {
          dateCreated?: string | null
          lessonCheatSheet?: string | null
          lessonDescription?: string | null
          lessonDuration?: number | null
          lessonID: string
          lessonKeyTakeaway?: string | null
          lessonName: string
          lessonText?: string | null
          lessonURL?: string | null
          sectionID: string
          unitID: string
        }
        Update: {
          dateCreated?: string | null
          lessonCheatSheet?: string | null
          lessonDescription?: string | null
          lessonDuration?: number | null
          lessonID?: string
          lessonKeyTakeaway?: string | null
          lessonName?: string
          lessonText?: string | null
          lessonURL?: string | null
          sectionID?: string
          unitID?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_sectionID_unitID_fkey"
            columns: ["sectionID", "unitID"]
            isOneToOne: false
            referencedRelation: "unit"
            referencedColumns: ["sectionID", "unitID"]
          },
        ]
      }
      question: {
        Row: {
          answer: string | null
          isSelfReflection: boolean
          option1: Json | null
          option2: Json | null
          option3: Json | null
          option4: Json | null
          question: string
          questionNo: number
          quizID: number
        }
        Insert: {
          answer?: string | null
          isSelfReflection: boolean
          option1?: Json | null
          option2?: Json | null
          option3?: Json | null
          option4?: Json | null
          question: string
          questionNo: number
          quizID: number
        }
        Update: {
          answer?: string | null
          isSelfReflection?: boolean
          option1?: Json | null
          option2?: Json | null
          option3?: Json | null
          option4?: Json | null
          question?: string
          questionNo?: number
          quizID?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_quizID_fkey"
            columns: ["quizID"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quizID"]
          },
        ]
      }
      quiz: {
        Row: {
          lastUpdated: string | null
          lessonID: string | null
          quizID: number
          quizType: Database["public"]["Enums"]["quiz_type"]
          sectionID: string
          unitID: string | null
        }
        Insert: {
          lastUpdated?: string | null
          lessonID?: string | null
          quizID?: number
          quizType: Database["public"]["Enums"]["quiz_type"]
          sectionID: string
          unitID?: string | null
        }
        Update: {
          lastUpdated?: string | null
          lessonID?: string | null
          quizID?: number
          quizType?: Database["public"]["Enums"]["quiz_type"]
          sectionID?: string
          unitID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_sectionID_fkey"
            columns: ["sectionID"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionID"]
          },
          {
            foreignKeyName: "quiz_sectionID_unitID_fkey"
            columns: ["sectionID", "unitID"]
            isOneToOne: false
            referencedRelation: "unit"
            referencedColumns: ["sectionID", "unitID"]
          },
          {
            foreignKeyName: "quiz_sectionID_unitID_lessonID_fkey"
            columns: ["sectionID", "unitID", "lessonID"]
            isOneToOne: false
            referencedRelation: "lesson"
            referencedColumns: ["sectionID", "unitID", "lessonID"]
          },
        ]
      }
      response: {
        Row: {
          questionNo: number
          quizID: number
          response: string | null
          userID: string
        }
        Insert: {
          questionNo: number
          quizID: number
          response?: string | null
          userID: string
        }
        Update: {
          questionNo?: number
          quizID?: number
          response?: string | null
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "response_quizID_questionNo_fkey"
            columns: ["quizID", "questionNo"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["quizID", "questionNo"]
          },
          {
            foreignKeyName: "response_userID_fkey"
            columns: ["userID"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userID"]
          },
        ]
      }
      result: {
        Row: {
          dateCreated: string | null
          quizID: number
          userID: string
        }
        Insert: {
          dateCreated?: string | null
          quizID: number
          userID: string
        }
        Update: {
          dateCreated?: string | null
          quizID?: number
          userID?: string
        }
        Relationships: [
          {
            foreignKeyName: "result_quizID_fkey"
            columns: ["quizID"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quizID"]
          },
          {
            foreignKeyName: "result_userID_fkey"
            columns: ["userID"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["userID"]
          },
        ]
      }
      section: {
        Row: {
          dateCreated: string | null
          finalAssessmentIntro: string | null
          finalScenario: string | null
          introductionURL: string | null
          sectionDescription: string | null
          sectionID: string
          sectionName: string
        }
        Insert: {
          dateCreated?: string | null
          finalAssessmentIntro?: string | null
          finalScenario?: string | null
          introductionURL?: string | null
          sectionDescription?: string | null
          sectionID: string
          sectionName: string
        }
        Update: {
          dateCreated?: string | null
          finalAssessmentIntro?: string | null
          finalScenario?: string | null
          introductionURL?: string | null
          sectionDescription?: string | null
          sectionID?: string
          sectionName?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_sectionName_fkey"
            columns: ["sectionName"]
            isOneToOne: false
            referencedRelation: "skillsfuturemapping"
            referencedColumns: ["skillsFutureCCS"]
          },
        ]
      }
      sectionsequence: {
        Row: {
          age: Database["public"]["Enums"]["age_type"]
          sectionID: string
          sequenceNo: number
        }
        Insert: {
          age: Database["public"]["Enums"]["age_type"]
          sectionID: string
          sequenceNo: number
        }
        Update: {
          age?: Database["public"]["Enums"]["age_type"]
          sectionID?: string
          sequenceNo?: number
        }
        Relationships: [
          {
            foreignKeyName: "sectionsequence_sectionID_fkey"
            columns: ["sectionID"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionID"]
          },
        ]
      }
      skillsfuturemapping: {
        Row: {
          cluster: string
          skillsFutureCCS: string
        }
        Insert: {
          cluster: string
          skillsFutureCCS: string
        }
        Update: {
          cluster?: string
          skillsFutureCCS?: string
        }
        Relationships: []
      }
      unit: {
        Row: {
          assessmentIntro: string | null
          dateCreated: string | null
          realityCheck: string | null
          scenario: string | null
          sectionID: string
          unitDescription: string | null
          unitID: string
          unitName: string
        }
        Insert: {
          assessmentIntro?: string | null
          dateCreated?: string | null
          realityCheck?: string | null
          scenario?: string | null
          sectionID: string
          unitDescription?: string | null
          unitID: string
          unitName: string
        }
        Update: {
          assessmentIntro?: string | null
          dateCreated?: string | null
          realityCheck?: string | null
          scenario?: string | null
          sectionID?: string
          unitDescription?: string | null
          unitID?: string
          unitName?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_sectionID_fkey"
            columns: ["sectionID"]
            isOneToOne: false
            referencedRelation: "section"
            referencedColumns: ["sectionID"]
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
