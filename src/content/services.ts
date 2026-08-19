import { ph } from "@/config/business";
import type { Service } from "@/config/business";
import type { FaqItem } from "@/components/ui/Faq";

/**
 * Long-form copy for the four service pages — CLAUDE.md §8 asks for 700–1,100
 * words of genuinely useful copy each, because that is what ranks.
 *
 * ---------------------------------------------------------------------------
 * WHAT IS AND IS NOT A PLACEHOLDER HERE
 * ---------------------------------------------------------------------------
 * The prose below is general trade knowledge — how panel repair actually
 * works, what a blend is, why a colour code alone is not enough. It is true of
 * any competent bodyshop and safe to publish as written.
 *
 * What is NOT safe is anything specific to GBR: turnaround times, price
 * bands, guarantee lengths, equipment you may not own, schemes you may not be
 * accredited to. Every one of those is wrapped in ph() and must be confirmed.
 * Read each page once before launch and correct anything that describes a
 * shop you are not.
 */

export type ServiceContent = {
  /** Names the damage type in the H1 — CLAUDE.md §8. */
  headline: string;
  /** One-paragraph intro under the H1. */
  standfirst: string;
  /** "What's included" — the scope of work. */
  included: { title: string; body: string }[];
  /** The process, start to finish. */
  process: { title: string; body: string }[];
  /** Long-form body copy. Each entry is a section with a heading. */
  detail: { heading: string; paras: string[] }[];
  /** Price guidance — a "from" band beats nothing (CLAUDE.md §8). */
  pricing: { band: string; note: string; factors: string[] };
  faqs: FaqItem[];
  /** Proof item ids from business.ts that belong on this page. */
  proofIds: string[];
};

export const serviceContent: Record<Service["slug"], ServiceContent> = {
  /* ------------------------------------------------------------------ */
  "accident-repair": {
    headline: "Accident repair",
    standfirst:
      "Collision damage, from a bumper you could live with to a car that arrived on a truck. We handle the assessment, the insurer if there is one, and the repair itself — structural work included.",
    included: [
      {
        title: "Panel repair and replacement",
        body: "Wings, doors, bumpers, bonnets, tailgates. Repaired where the metal allows it, replaced where it does not — we will tell you which and why.",
      },
      {
        title: "Structural and chassis work",
        body: "Impact rarely stops at the panel. Where the shell has moved, it is measured and pulled back to the manufacturer's geometry rather than disguised.",
      },
      {
        title: "Paint and refinishing",
        body: "Colour matched to the car in front of us, not just the paint code, and blended into the surrounding panels so the repair has no edge.",
      },
      {
        title: "Glass, lights and trim",
        body: "Headlamps, screens, mirrors, mouldings and the clips nobody counts until they are missing. Sourced and fitted as part of the same job.",
      },
      {
        title: "Post-repair checks",
        body: "Panel gaps, shut lines, door and boot operation, lights and electrics tested before the car goes back on the road.",
      },
    ],
    process: [
      {
        title: "Send photos or bring it in",
        body: "Three photos are usually enough for a first figure: a wide shot, the damage, and a close-up. If the damage looks structural we will want to see the car in person before quoting.",
      },
      {
        title: "Assessment and estimate",
        body: "We strip where necessary to see what is behind the panel. Hidden damage is normal on collision work — finding it early is what stops a job overrunning.",
      },
      {
        title: "Authorisation",
        body: "If you are claiming, we deal with the insurer and their engineer directly. If you are paying, you get a fixed figure before anything starts.",
      },
      {
        title: "Repair, paint, rebuild",
        body: "Panel work first, then prep and paint, then reassembly. Paint needs to cure properly — this is the stage that sets the timeline.",
      },
      {
        title: "Quality check and handover",
        body: "Washed, checked in daylight, and gone over with you before you take the keys.",
      },
    ],
    detail: [
      {
        heading: "Repair or replace?",
        paras: [
          "The honest answer depends on the panel, the material and where the damage sits. Steel work-hardens as it deforms, so a crease that has stretched the metal past a certain point will never sit flat again no matter how much filler goes over it — that panel needs replacing. A shallow dent in an unstretched area, by contrast, can often be worked back with almost nothing on top of it.",
          "Aluminium is less forgiving still. It has far less memory than steel, cracks rather than stretches, and needs its own tools and a separate work area to avoid cross-contamination with steel dust. Plenty of modern bonnets, doors and tailgates are aluminium, and a shop treating them like steel will produce a repair that fails within a year.",
          "We will tell you which category your damage falls into and what each route costs. Replacing a panel is not automatically the better repair, and repairing is not automatically the cheaper one — a used panel that needs full preparation and paint can cost more than straightening the original.",
        ],
      },
      {
        heading: "Structural damage and why it is different",
        paras: [
          "A modern car is designed to fold in a controlled way. Crumple zones absorb energy so the passenger cell does not, which means after a significant impact the parts that did their job are permanently altered. You cannot see most of this from outside the car.",
          "Where the structure has moved, it has to be measured against the manufacturer's reference points and pulled back on a jig — not eyeballed against the panel gaps. A shell left a few millimetres out will drive slightly crooked, wear its tyres unevenly, and behave unpredictably in a second impact.",
          "This is also where a cheap repair costs you most. A structurally compromised car that has been cosmetically tidied looks fine on the forecourt and is worth considerably less than one repaired properly, assuming it passes inspection at all.",
        ],
      },
      {
        heading: "Working with your insurer",
        paras: [
          "You choose the repairer. Your insurer may recommend one from their approved network, and that recommendation is exactly that — you are not obliged to accept it, and saying so on the phone costs you nothing.",
          "Where we are handling a claim, we produce the estimate, deal with the insurer's engineer, and negotiate any supplementary work that emerges once the car is stripped. You do not need to sit between us and them relaying messages.",
          "If the accident was not your fault, you should not be out of pocket at all. Ask us before you accept a settlement figure — the first offer is not always the whole picture.",
        ],
      },
    ],
    pricing: {
      band: ph("From £450"),
      note: ph(
        "A typical single-panel repair with paint starts around this figure. Collision work varies more than any other job we do — a bumper scuff and a shunt that has moved the shell are not the same conversation.",
      ),
      factors: [
        "How many panels are affected, and whether they repair or replace",
        "Whether the structure has moved",
        "Paint type — metallics, pearls and three-stage finishes cost more to match",
        "Parts availability and whether genuine parts are required",
        "Whether it is an insurance claim or self-funded",
      ],
    },
    faqs: [
      {
        q: "Can I choose my own repairer, or do I have to use my insurer's?",
        a: "You choose. Insurers often recommend a shop from their approved network, but you are entitled to have the car repaired where you want. Tell them you have a repairer and they will work with us.",
      },
      {
        q: "Will claiming affect my no-claims bonus?",
        a: ph(
          "If the accident was not your fault and the other driver is identified, your bonus should be protected once liability is settled. If you were at fault, or the other party cannot be traced, it usually will be affected. We can talk you through it before you decide whether to claim at all.",
        ),
      },
      {
        q: "How long will the repair take?",
        a: ph(
          "A single panel is typically a few days. Larger collision work runs longer, and paint curing time sets the floor regardless of how fast the panel work goes. We will give you a realistic date once the car is stripped and we know what is behind the damage.",
        ),
      },
      {
        q: "What if you find more damage once you start?",
        a: "It is common on collision work and it is why we strip before finalising. If we find more than the estimate covered we stop, document it, and get it authorised — by you or the insurer — before continuing. You will not receive a surprise invoice.",
      },
      {
        q: "Do you provide a courtesy car?",
        a: ph(
          "Subject to availability, yes. Confirm it with us when you book rather than assuming — demand varies and we would rather be straight with you than leave you without transport.",
        ),
      },
      {
        q: "Is the repair guaranteed?",
        a: ph(
          "Our paintwork carries a lifetime guarantee for as long as you own the vehicle. Ask us for the written terms — a guarantee you cannot read is not worth much.",
        ),
      },
    ],
    proofIds: ["proof-1"],
  },

  /* ------------------------------------------------------------------ */
  "smart-repair": {
    headline: "SMART repair",
    standfirst:
      "Small and Medium Area Repair Technology — localised repairs to dents, scratches, scuffed bumpers and kerbed alloys. Same result in the damaged area, a fraction of the time and cost of a full panel respray.",
    included: [
      {
        title: "Dent removal",
        body: "Door dings, trolley marks and small impact dents, worked out from behind where access allows so the original paint stays intact.",
      },
      {
        title: "Scratch and scuff repair",
        body: "Localised to the damaged area and blended out, rather than resprays of the whole panel.",
      },
      {
        title: "Bumper repairs",
        body: "Scuffs, scrapes and small cracks. Plastic bumpers can be plastic-welded and refinished rather than replaced.",
      },
      {
        title: "Kerbed alloy refurbishment",
        body: "Kerb rash cut back, filled where needed, and refinished to match the original wheel.",
      },
      {
        title: "Trim and mirror scuffs",
        body: "Mirror caps, door mouldings, sills and handles — the small stuff that makes a tidy car look tired.",
      },
    ],
    process: [
      {
        title: "Photograph the damage",
        body: "SMART repair is the easiest work to quote from photos. A close-up plus one from about a metre back tells us most of what we need.",
      },
      {
        title: "We confirm it is suitable",
        body: "Not every repair is a SMART repair. If the damage is too large or sits badly on a body line, we will say so rather than doing a compromised job.",
      },
      {
        title: "Repair and refinish",
        body: "Prep, colour match, apply, blend and flat back. Most of the work is preparation and matching, not the spraying itself.",
      },
      {
        title: "Collect, often same day",
        body: ph("Many SMART repairs are done in a few hours. Some are next day depending on the paint."),
      },
    ],
    detail: [
      {
        heading: "What SMART repair actually means",
        paras: [
          "It stands for Small and Medium Area Repair Technology, and the useful part of the definition is 'area'. Instead of masking off and respraying an entire door because there is a scratch near the handle, the repair is confined to the damaged region and blended into the surrounding paint until the transition is invisible.",
          "The advantages are speed and cost. You are paying for a fraction of the materials and a fraction of the labour, and the car is usually back with you far sooner. It is also less invasive: less of the factory paint is disturbed, which matters for the car's history.",
          "The limitation is size and position. Blending needs somewhere to fade out. A scratch in the middle of a large flat panel with no body line to hide the transition is harder to make invisible than the same scratch near a swage line or panel edge. An honest shop will tell you when a full panel respray is the better answer.",
        ],
      },
      {
        heading: "Paintless dent removal, and when it works",
        paras: [
          "Where the paint is unbroken and the dent is accessible from behind, it can often be massaged out with specialist rods and no paint at all. Done well, the result is genuinely original paint with the dent simply gone — the best possible outcome, and usually the cheapest.",
          "It depends on three things: the paint must be intact and not cracked, the metal must not be stretched past its memory, and there has to be access behind the panel. Modern cars with sound deadening, structural bracing and airbag hardware behind door skins have reduced how often that access exists.",
          "Where the paint is broken or the dent has a sharp crease, paintless is off the table and it becomes a fill-and-refinish job. That is still a SMART repair, just a longer one.",
        ],
      },
      {
        heading: "Colour matching on a car that has been in the sun",
        paras: [
          "The paint code on your VIN plate tells us what left the factory, not what is on the car now. Years of UV, washing and weather move the colour, and two cars with the same code and different histories are visibly different shades.",
          "That is why matching is done against the car in front of us, not from the code alone. Test cards are sprayed and checked against the actual panel in daylight before anything goes near the vehicle. Silvers and metallics need particular care because the metallic flake orientation changes the apparent shade depending on how it is applied.",
          "Blending into the surrounding area is the other half of it. Even a perfect match benefits from fading out across the panel rather than stopping at a hard edge, because the human eye finds edges far more easily than gradual transitions.",
        ],
      },
    ],
    pricing: {
      band: ph("From £95"),
      note: ph(
        "A single small scuff or dent typically starts around this figure. Multiple areas on the same visit usually work out cheaper per repair than booking them separately.",
      ),
      factors: [
        "Size of the damaged area and whether it crosses a body line",
        "Whether the paint is broken or the dent can be worked out paintless",
        "Paint type — solid colours are simpler than metallics and pearls",
        "How many separate areas are being repaired",
        "Alloy condition — light kerbing versus deep gouging or corrosion",
      ],
    },
    faqs: [
      {
        q: "Will the repair be invisible?",
        a: "That is the standard we work to, and on most SMART repairs it is achievable. Where the damage sits somewhere genuinely difficult to blend, we will tell you what to expect before starting rather than after.",
      },
      {
        q: "Is it cheaper than a full respray?",
        a: "Considerably, in most cases. You are paying for a localised area rather than a whole panel, in both materials and labour. It also usually takes hours instead of days.",
      },
      {
        q: "Can you repair a bumper rather than replace it?",
        a: "Usually. Plastic bumpers can be plastic-welded, filled and refinished, which is normally cheaper than a new bumper and avoids waiting on parts. Badly shattered bumpers or ones with damaged mounting points are better replaced.",
      },
      {
        q: "Can you do it at my home or workplace?",
        a: ph(
          "Ask us — mobile work depends on the repair and the conditions. Paintwork needs a controlled environment to cure properly, so some jobs genuinely have to come to the unit to be done right.",
        ),
      },
      {
        q: "Will it pass on a lease return inspection?",
        a: "That is one of the most common reasons people book SMART repairs, and doing it before you hand the car back is almost always cheaper than the lease company's damage charge. Bring us the inspection guidelines if you have them.",
      },
      {
        q: "Do you repair kerbed alloys?",
        a: "Yes — kerb rash is cut back, filled where necessary and refinished to match. Wheels with structural cracks or buckling are a different job and we will tell you if that is what you have.",
      },
    ],
    proofIds: ["proof-2"],
  },

  /* ------------------------------------------------------------------ */
  "paint-and-resprays": {
    headline: "Paint & resprays",
    standfirst:
      "Full and partial resprays, colour changes, colour matching and alloy refurbishment. The finish is what people judge the whole repair on, so it is where most of the work goes.",
    included: [
      {
        title: "Full resprays",
        body: "Whole-vehicle refinishing, including colour changes. Properly prepared, not blown over the top of what is already there.",
      },
      {
        title: "Panel and partial resprays",
        body: "One or several panels, blended into the surrounding bodywork so the repaired area has no visible edge.",
      },
      {
        title: "Colour matching",
        body: "Matched against the car itself and verified with sprayed test cards in daylight before anything is applied to the vehicle.",
      },
      {
        title: "Alloy wheel refurbishment",
        body: "Refinished to match the original, or changed to a different colour if you want them to.",
      },
      {
        title: "Lacquer peel and fade repair",
        body: "UV-damaged roofs, bonnets and bumpers stripped back and refinished rather than patched.",
      },
    ],
    process: [
      {
        title: "Assessment and colour check",
        body: "We read the paint code, then check it against the actual car. Sun-faded paint rarely matches its own code.",
      },
      {
        title: "Strip and preparation",
        body: "The unglamorous majority of the job. Trim removed, surfaces flatted, dents and imperfections corrected, everything masked.",
      },
      {
        title: "Primer and base coat",
        body: "Primed, guide-coated and flatted so the surface is genuinely flat before colour goes anywhere near it.",
      },
      {
        title: "Colour and lacquer",
        body: "Base coat applied and blended, then lacquered. Metallics need consistent technique or the flake lies unevenly and the panel looks patchy in daylight.",
      },
      {
        title: "Cure, flat and polish",
        body: "Baked, then flatted and machine-polished to remove texture and bring the gloss up to match the rest of the car.",
      },
    ],
    detail: [
      {
        heading: "Preparation is the job",
        paras: [
          "Anyone can spray paint onto a panel. What separates a repair that still looks right in three years from one that does not is almost entirely what happened before the colour went on.",
          "Paint does not hide imperfections, it reveals them. A gloss finish is a mirror, and every ripple, pinhole and sanding scratch underneath it becomes more obvious once it is shiny, not less. That is why guide coats exist — a contrasting mist sprayed over primer and then flatted back, so any low spot shows up as a dark patch and can be corrected before it is too late.",
          "It is also why a cheap respray is cheap. The materials cost roughly the same regardless. The variable is how many hours went into preparing the surface, and that is the first thing to disappear when the price comes down.",
        ],
      },
      {
        heading: "Why colour matching is harder than it sounds",
        paras: [
          "Every manufacturer's paint code covers a range rather than a single exact shade. Batches vary, factories vary, and cars built months apart can leave the line noticeably different. On top of that, paint changes on the road — UV fades it, and the rate depends on the colour, the climate and whether the car lived outdoors.",
          "Reds and solid dark colours fade fastest. Silvers and light metallics hold up better but are harder to match because the metallic flake creates a different apparent colour depending on the angle you view it from and how it was applied — spray technique itself becomes part of the match.",
          "Three-stage pearls are harder again. The colour comes from a translucent pearl layer over a base, so the final shade depends on how many coats went on. These have to be matched by spraying test cards and comparing them against the car in daylight, adjusting the number of coats until it disappears.",
        ],
      },
      {
        heading: "Blending, and why we do not stop at the panel edge",
        paras: [
          "Even with a good match, spraying a panel and stopping dead at its edge often leaves a repair you can see — because the eye is extremely good at spotting hard boundaries and much worse at spotting gradual change.",
          "So colour is faded out into the adjacent panels rather than terminated at the join. A door repair might carry a small amount of blend into the wing and the rear quarter. Slightly more material, considerably better result.",
          "On a full respray the question does not arise, which is one reason a colour change can be more straightforward to get right than matching a single panel on a ten-year-old car.",
        ],
      },
    ],
    pricing: {
      band: ph("From £320"),
      note: ph(
        "A single panel respray typically starts around this figure. Full resprays and colour changes are quoted individually — the variable is preparation hours and paint type, not the size of the car alone.",
      ),
      factors: [
        "Number of panels, and how much blending into adjacent panels is needed",
        "Paint type — solid, metallic, pearl or three-stage",
        "Condition underneath: rust, previous repairs and lacquer peel all add preparation",
        "Colour change means door shuts, jambs and engine bay, not just the outside",
        "How much trim has to come off and go back on",
      ],
    },
    faqs: [
      {
        q: "How long does a respray take?",
        a: ph(
          "A single panel is usually a few days including cure time. A full respray is a longer booking — it is mostly preparation, and rushing that is what produces work that fails. We will give you a firm date when we quote.",
        ),
      },
      {
        q: "Will the new paint match the rest of the car?",
        a: "That is the whole job. We match against the car itself rather than the paint code, verify with sprayed test cards in daylight, and blend into surrounding panels so there is no hard edge to give it away.",
      },
      {
        q: "Can you change the colour of my car completely?",
        a: "Yes. Bear in mind a proper colour change includes door shuts, jambs and other areas visible when the car is open — otherwise the original colour shows every time you open a door. You will also need to notify the DVLA of a colour change.",
      },
      {
        q: "Is your paintwork guaranteed?",
        a: ph(
          "Our paintwork carries a lifetime guarantee for as long as you own the vehicle. Ask for the written terms so you know exactly what is covered.",
        ),
      },
      {
        q: "My lacquer is peeling on the roof and bonnet — can that be fixed?",
        a: "Yes, and it needs stripping back properly rather than lacquering over. Peel happens when UV has broken down the bond between lacquer and base coat; new lacquer on top of a failing layer will lift again within months.",
      },
      {
        q: "Can you refurbish my alloys at the same time?",
        a: "Yes, and doing them alongside bodywork is usually more efficient than a separate booking. We can refinish to the original colour or change them.",
      },
    ],
    proofIds: ["proof-3"],
  },

  /* ------------------------------------------------------------------ */
  "servicing-and-mot": {
    headline: "Servicing & MOT",
    standfirst:
      "Servicing, MOT and mechanical work alongside the bodywork — so a car that needs both does not have to go to two places and wait twice.",
    included: [
      {
        title: "Servicing",
        body: ph(
          "Interim and full servicing to schedule, using parts and fluids to manufacturer specification.",
        ),
      },
      {
        title: "MOT testing",
        body: ph(
          "Annual MOT, with any remedial work handled in-house rather than sending you elsewhere.",
        ),
      },
      {
        title: "Brakes, suspension and steering",
        body: "Pads, discs, shocks, springs, bushes and the geometry that ties them together.",
      },
      {
        title: "Diagnostics",
        body: "Warning lights read and investigated properly — a code tells you where to look, not what is wrong.",
      },
      {
        title: "Post-accident mechanical checks",
        body: "Impact affects more than panels. Steering, suspension and alignment checked as part of collision repair.",
      },
    ],
    process: [
      {
        title: "Book it in",
        body: "Tell us the registration and what you need. If you are unsure whether it is due, we can check the MOT and service history from the reg.",
      },
      {
        title: "Inspection",
        body: "We go over the car and tell you what it needs now, what it will need soon, and what can wait — as three separate categories, not one list.",
      },
      {
        title: "Authorisation before work",
        body: "Nothing beyond the agreed scope happens without your say-so. If we find something during the service you get a call, not a bigger bill.",
      },
      {
        title: "Work and handover",
        body: "Done, checked, and explained. Old parts available if you want to see them.",
      },
    ],
    detail: [
      {
        heading: "One place for bodywork and mechanical",
        paras: [
          "Most accident repair centres do bodywork and send you elsewhere for anything mechanical. That is fine until the two overlap — which after a collision they usually do.",
          "An impact hard enough to damage a wing is often hard enough to move the suspension geometry behind it. If the bodyshop only puts the panel right and nobody checks the alignment, the car looks correct and drives badly, and the tyres wear out early telling you so.",
          "Having both under one roof means the car gets checked as a whole. It also means a service due while the car is in for paint can simply be done in the same visit rather than costing you a second week without it.",
        ],
      },
      {
        heading: "What an MOT does and does not tell you",
        paras: [
          "An MOT is a minimum roadworthiness test on the day it is taken. It is not a service, and it is not a statement that the car is in good health — it checks specific safety and emissions items against defined limits, and that is all.",
          "Pass with advisories and the advisories matter. They are the tester saying something is wearing but has not yet crossed the threshold. Brake pads at the limit will pass in March and fail in September, and the difference between dealing with that on your terms and being caught out is usually just whether you read the advisory.",
          "This is why servicing and MOT are separate things that people conflate. A serviced car is far more likely to pass, but passing is not evidence of having been serviced.",
        ],
      },
      {
        heading: "Servicing without the mystery",
        paras: [
          "You should know what you are paying for. A service schedule is a list of items with intervals attached, and there is no reason it should not be shown to you before the work rather than summarised afterwards.",
          "We separate what we find into three: needs doing now for safety or legality, will need doing within a few months, and can reasonably wait. Presenting all three as equally urgent is how garages lose people's trust, and it is not something we do.",
          "Using manufacturer-specification parts and fluids also matters more than it used to. Modern engines are specific about oil grade, and the wrong specification will not fail immediately — it will just quietly cost you engine life.",
        ],
      },
    ],
    pricing: {
      band: ph("From £129"),
      note: ph(
        "Interim servicing typically starts around this figure; full servicing and MOT are quoted on the vehicle. Ask when you book — you should know the number before the car arrives, not after.",
      ),
      factors: [
        "Interim versus full service schedule",
        "Engine size and oil specification",
        "Whether it is combined with an MOT or other work in the same visit",
        "Parts required — brakes, filters, cambelts and the like quoted separately",
        "Whether diagnostics are needed to investigate a fault",
      ],
    },
    faqs: [
      {
        q: "Do you do MOTs on site?",
        a: ph(
          "Confirm this with us when booking — we will tell you plainly whether the test is done here or arranged nearby, and either way any remedial work is handled in-house.",
        ),
      },
      {
        q: "Will servicing here affect my manufacturer warranty?",
        a: "Not if it is done to the manufacturer's schedule with parts of the correct specification, which is what block exemption rules protect. You do not have to use a main dealer to keep a warranty valid — you do have to have the right work done and recorded.",
      },
      {
        q: "Can you service the car while it is in for bodywork?",
        a: "Yes, and it is one of the main reasons to use a shop that does both. If the car is already with us for paint, a service in the same visit costs you no additional time off the road.",
      },
      {
        q: "What happens if my car fails its MOT?",
        a: "We will tell you exactly what failed, what it costs to put right, and what your options are. Because the mechanical work is done here, a fail does not mean starting again somewhere else.",
      },
      {
        q: "Do you check the car after an accident repair?",
        a: "As standard. Impact damage frequently affects steering, suspension and alignment even when the visible damage is confined to a panel — checking it is part of doing the repair properly rather than an extra.",
      },
      {
        q: "Will you tell me what needs doing before you do it?",
        a: "Always. Nothing outside the agreed scope happens without your authorisation, and anything we find is presented as needs-doing-now, needs-doing-soon, or can-wait, so you can make your own decision.",
      },
    ],
    proofIds: [],
  },
};
