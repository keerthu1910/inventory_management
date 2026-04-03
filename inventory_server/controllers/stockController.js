import StockService from "../services/stockService.js";

class StockController {
  constructor() {
    this.stockService = new StockService();
  }

  getStockDetails = async (req, res) => {
    try {
      const results = await this.stockService.getStockDetails();
      return res.status(200).json({ data: results });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  };

  getStockStats = async (req, res) => {
    try {
      const response = await this.stockService.getStockStats();
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message,
      });
    }
  };
}

export default StockController;
