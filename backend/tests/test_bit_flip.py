import unittest

from qec.bit_flip import run_bit_flip


class BitFlipSimulationTests(unittest.TestCase):
    def test_run_bit_flip_accepts_control_parameters(self) -> None:
        result = run_bit_flip(error_probability=0.25, shots=512, seed=7)

        self.assertIsInstance(result['counts'], dict)
        self.assertIn('fidelity', result)
        self.assertIn('error_rate', result)
        self.assertTrue(result['circuit_image'])

    def test_higher_error_probability_reduces_fidelity(self) -> None:
        low_noise = run_bit_flip(error_probability=0.0, shots=512, seed=11)
        high_noise = run_bit_flip(error_probability=0.9, shots=512, seed=11)

        self.assertGreater(low_noise['fidelity'], high_noise['fidelity'])
        self.assertGreater(high_noise['error_rate'], low_noise['error_rate'])


if __name__ == '__main__':
    unittest.main()
