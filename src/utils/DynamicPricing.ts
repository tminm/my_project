export class DynamicPricing {
  private basePrice: number;

  constructor(basePrice: number) {
    this.basePrice = basePrice;
  }

  // 时间因子
  private timeFactor(date: Date): number {
    const hour = date.getHours();
    if (hour >= 18 && hour <= 22) {
      return 1.2;
    }
    return 1;
  }

  // 需求因子
  private demandFactor(demandLevel: number): number {
    if (demandLevel > 80) {
      return 1.3;
    } else if (demandLevel < 20) {
      return 0.8;
    }
    return 1;
  }

  // 季节因子
  private seasonFactor(
    startTime: {
      month: number;
      day: number;
    },
    endTime: {
      month: number;
      day: number;
    }
  ): number {
    if (
      startTime.month === 6 ||
      endTime.month === 6 ||
      startTime.month === 11 ||
      endTime.month === 11
    ) {
      return 1.1;
    }
    return 1;
  }

  // 周末因子
  private weekendFactor(
    startTime: {
      month: number;
      day: number;
    },
    endTime: {
      month: number;
      day: number;
    }
  ): number {
    if (
      startTime.day === 0 ||
      startTime.day === 6 ||
      endTime.day === 6 ||
      endTime.day === 0
    ) {
      return 1.15;
    }
    return 0.8;
  }

  // 淡季因子
  private offSeasonFactor(
    startTime: {
      month: number;
      day: number;
    },
    endTime: {
      month: number;
      day: number;
    }
  ): number {
    if (
      startTime.month === 2 ||
      startTime.month === 3 ||
      startTime.month === 9 ||
      startTime.month === 10
    ) {
      return 0.9;
    }
    return 0.8;
  }

  // 计算每晚的动态价格
  public calculateNightlyPrice(
    startTime: {
      month: number;
      day: number;
    },
    endTime: {
      month: number;
      day: number;
    },
    demandLevel: number
  ): number {
    let price = this.basePrice;
    price *= this.demandFactor(demandLevel);
    price *= this.seasonFactor(startTime, endTime);
    price *= this.weekendFactor(startTime, endTime);
    price *= this.offSeasonFactor(startTime, endTime);
    return price;
  }
}
