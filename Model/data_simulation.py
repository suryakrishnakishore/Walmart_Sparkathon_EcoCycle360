import pandas as pd
import random

virgin_emissions = {
    "Plastic": 6.0,
    "Paper": 2.7,
    "E-waste": 12.0,
    "Books": 2.5,
    "Glass": 1.6,
    "Clothes": 8.0
}


process_emissions = {
    "India": 2.0,
    "USA": 1.2,
    "Germany": 0.5,
    "EU": 1.1
}


transport_emission_factor = 0.12 # (kg CO₂ per ton-km)


materials = list(virgin_emissions.keys())
regions = list(process_emissions.keys())
distances = [5, 10, 25, 50, 75, 100] # in Km

dataset = []

for material in materials:
    for region in regions:
        for distance in distances:
            for _ in range(49):
                weight = round(random.uniform(0.2, 10.0), 2)  # in kg

                virgin_factor = virgin_emissions[material]
                process_factor = process_emissions[region]

                # Compute emissions
                virgin_co2 = weight * virgin_factor
                process_co2 = weight * process_factor
                transport_co2 = (weight / 1000) * distance * transport_emission_factor

                net_co2_saved = round(virgin_co2 - process_co2 - transport_co2, 3)
                net_co2_saved = max(0, net_co2_saved)

                
                dataset.append([
                    material,
                    weight,
                    distance,
                    region,
                    round(virgin_co2, 3),
                    round(process_co2, 3),
                    round(transport_co2, 3),
                    net_co2_saved
                ])


df = pd.DataFrame(dataset, columns=[
    "Material", "Weight (kg)", "Transport Distance (km)", "Region",
    "Virgin CO₂ (kg)", "Process CO₂ (kg)", "Transport CO₂ (kg)", "Net CO₂ Saved (kg)"
])

df = df.sample(frac=1).reset_index(drop=True)

df.to_csv("carbon_footprint_dataset_balanced.csv", index=False)
print("✅ Dataset saved to 'carbon_footprint_dataset_balanced.csv'")
