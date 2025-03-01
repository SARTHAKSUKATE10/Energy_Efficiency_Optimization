def compute_energy_distribution(total_energy, season, period, festival_effect=1.0):
    """
    Compute urban, rural, and sector-wise energy consumption based on total energy,
    incorporating seasonal, period, and festival effects.
    
    :param total_energy: Total energy consumption (kWh)
    :param season: Season (Winter, Summer, Monsoon, etc.)
    :param period: Period (Pre-lockdown, Lockdown, Post-lockdown)
    :param festival_effect: Multiplier for festival impact (default: 1.0, increase for high consumption periods)
    :return: Dictionary containing urban, rural, and sector-wise consumption values.
    """
    # Base ratios
    base_urban_ratio = 0.6059
    base_rural_ratio = 0.3941
    
    urban_sector_ratios = {
        "Urban Household": 0.2836,
        "Urban Industrial": 0.3781,
        "Urban Commercial": 0.1890,
        "Urban Others": 0.0945,
    }
    
    rural_sector_ratios = {
        "Rural Household": 0.4726,
        "Rural Industrial": 0.1890,
        "Rural Commercial": 0.1890,
        "Rural Others": 0.0945,
    }
    
    # Seasonal effect
    season_multipliers = {
        "Winter": 1.05,
        "Summer": 1.10,
        "Monsoon": 0.95,
        "Autumn": 1.00,
        "Post-Monsoon": 0.98,
    }
    
    # Period effect
    period_multipliers = {
        "Pre-lockdown": 1.00,
        "Lockdown": 0.85,
        "Post-lockdown": 1.05,
    }
    
    # Adjust total energy based on season, period, and festival
    season_factor = season_multipliers.get(season, 1.0)
    period_factor = period_multipliers.get(period, 1.0)
    adjusted_total_energy = total_energy * season_factor * period_factor * festival_effect
    
    # Compute urban and rural energy usage
    urban_usage = adjusted_total_energy * base_urban_ratio
    rural_usage = adjusted_total_energy * base_rural_ratio
    
    # Compute sector-wise distribution
    urban_distribution = {sector: urban_usage * ratio for sector, ratio in urban_sector_ratios.items()}
    rural_distribution = {sector: rural_usage * ratio for sector, ratio in rural_sector_ratios.items()}
    
    return {
        "Total Energy": adjusted_total_energy,
        "Urban Usage": urban_usage,
        "Rural Usage": rural_usage,
        "Urban Distribution": urban_distribution,
        "Rural Distribution": rural_distribution,
    }

