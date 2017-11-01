import request from 'supertest-as-promised'
import httpStatus from 'http-status'
import chai from 'chai'
import { expect, } from 'chai'
import app from '../../index'

chai.config.includeStack = true

describe('## Misc', () => {
	describe('# GET /api/404', () => {
		it('should return 404 status', (done) => {
			request(app)
				.get('/api/404')
				.expect(httpStatus.NOT_FOUND)
				.then((res) => {
					expect(res.body.message).to.equal('Not Found')
					done()
				})
		})
	})

	describe('# Error Handling', () => {
		it('should handle mongoose CastError - Cast to ObjectId failed', (done) => {
			request(app)
				.get('/api/users/56z787zzz67fc')
				.expect(httpStatus.INTERNAL_SERVER_ERROR)
				.then((res) => {
					expect(res.status).to.equal(500)
					done()
				})
		})

		it('should handle express validation error - username is required', (done) => {
			request(app)
				.post('/api/users')
				.send({
					mobileNumber: '1234567890',
				})
				.expect(httpStatus.BAD_REQUEST)
				.then((res) => {
					expect(res.status).to.equal(400)
					done()
				})
		})
	})
})
